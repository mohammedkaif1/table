package com.rotation.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rotation.entity.Employees;
import com.rotation.repository.EmployeesRepository;
import com.rotation.service.EmployeesService;

import jakarta.transaction.Transactional;

@Service


public  class Employeeserviceimpl implements EmployeesService{
	@Autowired
	private EmployeesRepository repo;
	
	public List<Employees> findAll()
	{
		return this.repo.findAll();
	}
	
	public Employees save(Employees emp)
	{
		 String k=emp.getProject();
		emp.setProject(k.toUpperCase());
		
		return this.repo.save(emp);
	}
	
	public Employees findById(int employeeId)
	{
		return this.repo.findById(employeeId).orElse(null);
	}
	

	@Override
	public int getFlaggedEmployeeCount() {
		// TODO Auto-generated method stub
		return this.repo.countByflaggedForRotation('1');
	}

	@Override
	public int getEligibleEmployeeCount() {
		// TODO Auto-generated method stub
		return this.repo.countByeligibleForRotationPool('1');
	}

	@Override
	public List<Employees> filterEmployees(Map<String, String> popoverText) {
		List<Employees> allEmployees=repo.findAll();
	    return allEmployees.stream().filter(emp->{
			boolean includeEmployee=true;
			for(Map.Entry<String,String> entry : popoverText.entrySet())
			{
				String columnName=entry.getKey();
				String filterValue=entry.getValue();
				if(filterValue!=null && !filterValue.trim().isEmpty())
				{
				
				
				switch(columnName)
				{
				case "employeeId":
					
					includeEmployee=includeEmployee && Integer.toString(emp.getEmployeeId()).equals(filterValue);
					break;
				case "employeeName":
					includeEmployee=includeEmployee && emp.getEmployeeName().contains(filterValue);
					break;
				case "sdm":
					includeEmployee=includeEmployee && emp.getSdm().equals(filterValue);
					break;
				case "skills":
					includeEmployee=includeEmployee && emp.getSkills().contains(filterValue);
					break;
				case "project":
					filterValue=filterValue.toUpperCase();
					includeEmployee=includeEmployee && emp.getProject().equals(filterValue);
					break;
				case "filterbased":
					if (filterValue.equals("EligibleForRotation"))
					{
						System.out.println("hai");
						includeEmployee=includeEmployee && emp.getEligibleForRotationPool()=='1';
						break;
					}
					else if(filterValue.equals("FlaggedForRotation"))
					{
						includeEmployee=includeEmployee && emp.getFlaggedForRotation()=='1';
						break;
					}
					else {
						continue;
					}
				
				
				}
				}
			}
			
			return includeEmployee;
			
			
		}).collect(Collectors.toList());
				
		
		
	}
}
	


	
	
	
	
	
	


