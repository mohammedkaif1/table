package in.co.vwit.engineering.resourceManagement.entity;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "hiring_project_details")
public class HiringStrategyProjectDetails {

	@Id
	
	private int projectID;
	private String projectName;
	private int totalResourcesRequired=0;
	private int internalResourcesAllocated=0;
	private int toBeHired;
	private int duration=0;
	private String sdm;
	@OneToMany(cascade=CascadeType.ALL,targetEntity = HiringStrategyHiringDetails.class)
	private List<HiringStrategyHiringDetails> employeeId1;
	
	

	

	public List<HiringStrategyHiringDetails> getEmployeeId() {
		return employeeId1;
	}

	public void setEmployeeId(List<HiringStrategyHiringDetails> employeeId) {
		this.employeeId1 = employeeId;
	}

	public int getProjectID() {
		return projectID;
	}

	public void setProjectID(int projectID) {
		this.projectID = projectID;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public int getTotalResourcesRequired() {
		return totalResourcesRequired;
	}

	public void setTotalResourcesRequired(int totalResourcesRequired) {
		this.totalResourcesRequired = totalResourcesRequired;
	}

	public int getInternalResourcesAllocated() {
		return internalResourcesAllocated;
	}

	public void setInternalResourcesAllocated(int internalResourcesAllocated) {
		this.internalResourcesAllocated = internalResourcesAllocated;
	}

	public int getToBeHired() {
		return toBeHired;
	}

	public void setToBeHired(int toBeHired) {
		this.toBeHired = toBeHired;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getSdm() {
		return sdm;
	}

	public void setSdm(String sdm) {
		this.sdm = sdm;
	}

	public HiringStrategyProjectDetails(int projectID, String projectName, int totalResourcesRequired,
			int internalResourcesAllocated, int toBeHired, int duration, String sdm) {
		this.projectID = projectID;
		this.projectName = projectName;
		this.totalResourcesRequired = totalResourcesRequired;
		this.internalResourcesAllocated = internalResourcesAllocated;
		this.toBeHired = toBeHired;
		this.duration = duration;
		this.sdm = sdm;
	}

	public HiringStrategyProjectDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}





