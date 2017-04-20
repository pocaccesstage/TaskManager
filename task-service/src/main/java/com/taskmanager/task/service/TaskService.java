package com.taskmanager.task.service;

import java.util.List;

import com.taskmanager.task.domain.Task;

public interface TaskService {

	void create(Task task);
	void delete(Task task);
	Task update(Task task);
	List<Task> list();
	Task getTask(long id);
}
