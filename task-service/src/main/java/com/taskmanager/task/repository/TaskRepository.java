package com.taskmanager.task.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.task.domain.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

}
