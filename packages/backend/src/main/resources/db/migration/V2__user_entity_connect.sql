ALTER TABLE application.business_model_canvas
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE business_model_canvas ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE business_model_canvas ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.criteria
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE criteria ADD CONSTRAINT FK_CRITERIA_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE criteria ADD CONSTRAINT FK_CRITERIA_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.diagnostic
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE diagnostic ADD CONSTRAINT FK_DIAGNOSTIC_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE diagnostic ADD CONSTRAINT FK_DIAGNOSTIC_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.entry_type
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE entry_type ADD CONSTRAINT FK_ENTRY_TYPE_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE entry_type ADD CONSTRAINT FK_ENTRY_TYPE_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.file
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.file ADD CONSTRAINT FK_FILE_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.file ADD CONSTRAINT FK_FILE_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.idea_and_criteria
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.idea_and_criteria ADD CONSTRAINT FK_IDEA_AND_CRITERIA_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.idea_and_criteria ADD CONSTRAINT FK_IDEA_AND_CRITERIA_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.idea
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.idea ADD CONSTRAINT FK_IDEA_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.idea ADD CONSTRAINT FK_IDEA_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.keyword
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.keyword ADD CONSTRAINT FK_KEYWORD_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.keyword ADD CONSTRAINT FK_KEYWORD_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.kpi
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.kpi ADD CONSTRAINT FK_KPI_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.kpi ADD CONSTRAINT FK_KPI_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.project
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.project ADD CONSTRAINT FK_PROJECT_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.project ADD CONSTRAINT FK_PROJECT_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.project_has_user_role
   ALTER COLUMN user_inum TYPE VARCHAR(36),
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.project_has_user_role ADD CONSTRAINT FK_PROJECT_HAS_USER_ROLE_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.project_has_user_role ADD CONSTRAINT FK_PROJECT_HAS_USER_ROLE_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.project_has_user_role ADD CONSTRAINT FK_PROJECT_HAS_USER_ROLE_ON_USER_INUM FOREIGN KEY (user_inum) REFERENCES identity.user_entity (id);


ALTER TABLE application.source
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.source ADD CONSTRAINT FK_SOURCE_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.source ADD CONSTRAINT FK_SOURCE_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);


ALTER TABLE application.vcw
   ALTER COLUMN updated_by TYPE VARCHAR(36),
   ALTER COLUMN created_by TYPE VARCHAR(36);

ALTER TABLE application.vcw ADD CONSTRAINT FK_VCW_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES identity.user_entity (id);

ALTER TABLE application.vcw ADD CONSTRAINT FK_VCW_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES identity.user_entity (id);
