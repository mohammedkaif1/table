package in.co.vwit.engineering.resourceManagement.entity;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Audited
public class EmployeeContingent   {
	
	@Id
	private int employeeId;
	
	private String employeeName;
	
	private float yearsofExperience;
	
	@Column(length = 20)
	private String sdm;
	
	@Column(length = 25)
	private String currentStatus;
	
	@Column(length = 10)
	private String location;
	
	@Column(length = 7)
	private String billingLevel;
	
	@Column(length = 10)
	private String typeOfEmployment;
	
	
	
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name="EmployeeSkills",joinColumns = @JoinColumn(name="employeeId_fk"))
	private List<String>employeeSkills;
	
	
	@Column(length = 10)
	private String employeeType;
	
	@Column(length = 20)
	private String dlvnumber;
	
	
	@JsonFormat(pattern="dd/MM/yyyy" ,shape=Shape.STRING)
	private Date dateofJoining;
	
	
	
	@Column(length = 20)
	private String projectName;
	
	@Column(length = 20)
	private Boolean planForProject;
	 
private char  eligibleForRotationPool;
	
	
	private char flaggedForRotation;
	

		
	
	

	//@ElementCollection(fetch = FetchType.EAGER)
  //@CollectionTable(name="Remarks",joinColumns = @JoinColumn(name="employeeId_fk"))
	//private List<String> remarks;

	public char getEligibleForRotationPool() {
		return eligibleForRotationPool;
	}

	public void setEligibleForRotationPool() {
		if (this.yearsofExperience >=2)
		{
			this.eligibleForRotationPool='1';
		}
		else
		{
			this.eligibleForRotationPool ='0';
		}
		
	}

	public char getFlaggedForRotation() {
		return flaggedForRotation;
	}

	public void setFlaggedForRotation(char flaggedForRotation) {
		this.flaggedForRotation = flaggedForRotation;
	}

	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,targetEntity = ContingentRemarks.class)
	 @JoinColumn(name="remarkFK",referencedColumnName = "employeeId")
	private List<ContingentRemarks> remark;

	
	


	public List<ContingentRemarks> getRemark() {
		return remark;
	}

	public void setRemark(List<ContingentRemarks> remark) {
		this.remark = remark;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public float getYearsofExperience() {
		return yearsofExperience;
	}

	public void setYearsofExperience(int yearsofExperience) {
		this.yearsofExperience = yearsofExperience;
	}

	public String getSdm() {
		return sdm;
	}

	public void setSdm(String sdm) {
		this.sdm = sdm;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getBillingLevel() {
		return billingLevel;
	}

	public void setBillingLevel(String billingLevel) {
		this.billingLevel = billingLevel;
	}

	public String getTypeOfEmployment() {
		return typeOfEmployment;
	}

	public void setTypeOfEmployment(String typeOfEmployment) {
		this.typeOfEmployment = typeOfEmployment;
	}

	public List<String> getEmployeeSkills() {
		return employeeSkills;
	}

	public void setEmployeeSkills(List<String> employeeSkills) {
		this.employeeSkills = employeeSkills;
	}

	public String getEmployeeType() {
		return employeeType;
	}

	public void setEmployeeType(String employeeType) {
		this.employeeType = employeeType;
	}

	public String getDlvnumber() {
		return dlvnumber;
	}

	public void setDlvnumber(String dlvnumber) {
		this.dlvnumber = dlvnumber;
	}



	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public Boolean getPlanForProject() {
		return planForProject;
	}

	public void setPlanForProject(Boolean planForProject) {
		this.planForProject = planForProject;
	}

	public Date getDateofJoining() {
		return dateofJoining;
	}

	public void setDateofJoining(Date dateofJoining) {
		this.dateofJoining = dateofJoining;
	}

	@Override
	public String toString() {
		return "EmployeeContingent [employeeId=" + employeeId + ", employeeName=" + employeeName
				+ ", yearsofExperience=" + yearsofExperience + ", sdm=" + sdm + ", currentStatus=" + currentStatus
				+ ", location=" + location + ", billingLevel=" + billingLevel + ", typeOfEmployment=" + typeOfEmployment
				+ ", employeeSkills=" + employeeSkills + ", employeeType=" + employeeType + ", dlvnumber=" + dlvnumber
				+ ", dateofJoining=" + dateofJoining + ", projectName=" + projectName + ", planForProject="
				+ planForProject + ", eligibleForRotationPool=" + eligibleForRotationPool + ", flaggedForRotation="
				+ flaggedForRotation + ", remark=" + remark + "]";
	}

	



	

	
	
	
	
}
