package com.pcbuilder.repository;

import com.pcbuilder.model.Setup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetupRepository extends JpaRepository<Setup, Long> {

}
