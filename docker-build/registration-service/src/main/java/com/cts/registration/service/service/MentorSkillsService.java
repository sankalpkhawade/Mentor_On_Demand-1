package com.cts.registration.service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.registration.service.model.MentorSkills;
import com.cts.registration.service.repository.MentorDetailsRepository;
import com.cts.registration.service.repository.MentorSkillsRepository;
import com.cts.registration.service.repository.TechnologyRepositry;


@Service
public class MentorSkillsService {

	@Autowired
	MentorSkillsRepository mentorSkillsRepository;

	@Autowired
	MentorDetailsRepository mentorDetailsRepository;
	
	@Autowired
	TechnologyRepositry technologyRepositry;
	
	public void saveSkills(MentorSkills mentorSkills) {
		mentorSkillsRepository.save(mentorSkills);
	}

	public boolean updateSkills(MentorSkills mentorSkills, String userName, String technologyName) {
		MentorSkills oldMentorSkills = mentorSkillsRepository.findById(mentorSkills.getId());
		if (oldMentorSkills != null) {
			mentorSkills.setMentorDetails(mentorDetailsRepository.findByUserName(userName));
			mentorSkills.setTechnologies(technologyRepositry.findByName(technologyName));
			mentorSkillsRepository.save(mentorSkills);
			return true;
		}
		return false;
	}

	public MentorSkills editMentorSkills(int id) {
		return mentorSkillsRepository.findById(id);
	}

}
