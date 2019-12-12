package com.cts.training.service.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.TransactionAnnotationParser;

import com.cts.training.service.TrainingServiceApplication;
import com.cts.training.service.model.MentorDetails;
import com.cts.training.service.model.MentorSkills;
import com.cts.training.service.model.Technology;
import com.cts.training.service.model.Training;
import com.cts.training.service.repository.MentorDetailsRepository;
import com.cts.training.service.repository.MentorSkillsRepository;
import com.cts.training.service.repository.StudentDetailsRepository;
import com.cts.training.service.repository.TechnologyRepositry;
import com.cts.training.service.repository.TrainingRepository;

@Service
public class TrainingService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TrainingServiceApplication.class);
	
	@Autowired
	TrainingRepository trainingRepository;

	@Autowired
	StudentDetailsRepository studentDetailsRepository;

	@Autowired
	MentorSkillsRepository mentorSkillsRepository;

	@Autowired
	TechnologyRepositry technologyRepositry;
	
	@Autowired
	MentorDetailsRepository mentorDetailsRepository;

	public void giveRating(int trainingId, int rating) {
		Training training = trainingRepository.findById(trainingId);
		training.setRating(rating);
		trainingRepository.save(training);
	}

	public List<Training> getCurrentTrainings(String studentName) {
		return trainingRepository.findByStudentDetails(studentDetailsRepository.findByUserName(studentName));
	}

	public String[] getTableOfContents(String mentorName, String status) {
		Training training = trainingRepository.findByMentorDetail(mentorName, status);
		MentorSkills mentorSkills = mentorSkillsRepository.findById(training.getMentorSkills().getId());
		Technology technology = technologyRepositry.findByName(mentorSkills.getTechnologies().getName());
		String toc = technology.getTableOfContents();
		String[] tableOfContents;
		tableOfContents = toc.split(" ");
		LOGGER.info("Table Of Contents : " + tableOfContents);
		return tableOfContents;
	}

	public void updateProgress(String mentorName, String status) {
		Training training = trainingRepository.findByMentorDetail(mentorName, status);
		if (Integer.parseInt(training.getProgress()) < 75) {
			int progress = Integer.parseInt(training.getProgress()) + 25;
			training.setProgress(Integer.toString(progress));
			int experience = (int) training.getMentorSkills().getExperience();
			training.setAmount(training.getAmount()+(experience*5000));
			trainingRepository.save(training);
		} else if(Integer.parseInt(training.getProgress()) == 75) {
			int progress = Integer.parseInt(training.getProgress()) + 25;
			training.setProgress(Integer.toString(progress));
			training.setStatus("C");
			MentorDetails mentorDetails = mentorDetailsRepository.findByUserName(training.getMentorDetails().getUserName());
			mentorDetails.setActive(true);
			trainingRepository.save(training);
		}
	}
}
