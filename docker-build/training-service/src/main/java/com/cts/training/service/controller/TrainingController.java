package com.cts.training.service.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.training.service.model.Training;
import com.cts.training.service.service.TrainingService;

@RestController
@RequestMapping("training")
public class TrainingController {

	@Autowired
	TrainingService trainingService;
	
	@PutMapping("/student/rating/{trainingId}/{rating}")
	public void giveRating(@Valid @PathVariable("trainingId") int trainingId, @Valid @PathVariable("rating") int rating) {
		trainingService.giveRating(trainingId, rating);
	}
	
	@GetMapping("/student/current/{studentName}")
	public List<Training> getCurrentTrainings(@Valid @PathVariable("studentName") String studentName) {
		return trainingService.getCurrentTrainings(studentName);
	}
	
	@GetMapping("/contents/{mentorName}/{status}")
	public String[] getTableOfContents(@Valid @PathVariable("mentorName") String mentorName,@Valid @PathVariable("status") String status) {
		return trainingService.getTableOfContents(mentorName, status);
	}
	
	@PutMapping("/progress/{mentorName}/{status}")
	public void updateProgress(@Valid @PathVariable("mentorName") String mentorName,@Valid @PathVariable("status") String status) {
		trainingService.updateProgress(mentorName, status);
	}
}
