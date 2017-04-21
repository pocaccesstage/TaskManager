package com.taskmanager.task.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.task.domain.Task;
import com.taskmanager.task.service.TaskService;

@RestController
public class TaskController {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private TaskService taskService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET, produces = "application/json")
	public List<Task> list() {
		return taskService.list();
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json")
	public void delete(@RequestBody Task task) {
		log.info("task delete: {}", task.getId());
		taskService.delete(task);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST, produces = "application/json")
	public Task update(@RequestBody Task task) {
		return taskService.update(task);
	}

	@RequestMapping(value = "/get", method = RequestMethod.POST, produces = "application/json")
	public Task get(@RequestBody Task task) {
		return taskService.getTask(task.getId());
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json")
	public void create(@RequestBody Task task) {
		log.error(task.getDescription());
		taskService.create(task);
	}
}
