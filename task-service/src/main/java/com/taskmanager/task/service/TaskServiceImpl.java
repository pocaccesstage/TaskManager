package com.taskmanager.task.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.task.domain.Task;
import com.taskmanager.task.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

	private final Logger log = LoggerFactory.getLogger(getClass());
	
	private TaskRepository repository;
	
	@Autowired
	public void setTaskRepository(TaskRepository taskRepository) {
		this.repository = taskRepository;
	}

	@Override
	public void create(Task task) {
		log.info("new task has been created: {}", task.getId());
		repository.save(task);		
	}
	
	@Override
	public void delete(Task task) {
		log.info("task delete: {}", task.getId());
		repository.delete(task);		
	}

	@Override
	public Task update(Task task) {
		log.info("task update: {}", task.getId());
		return repository.save(task);
	}

	@Override
	public List<Task> list() {
		
		Iterable<Task> it = repository.findAll();
		
		List<Task> tasks = new ArrayList<>();
		it.forEach(tasks::add);

		
		log.info("task listAll");
		return tasks;
	}

	@Override
	public Task getTask(long id) {
		Task task = repository.findOne(id);
		log.info("task getTask: {}", task.getId());
		return task;
	}
}
