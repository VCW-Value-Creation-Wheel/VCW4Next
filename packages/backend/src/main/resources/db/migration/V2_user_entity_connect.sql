ALTER TABLE application.business_model_canvas
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE business_model_canvas ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE business_model_canvas ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.criteria
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE criteria ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE criteria ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.diagnostic
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE diagnostic ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE diagnostic ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.entry_type
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE entry_type ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE entry_type ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.file
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.file ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.file ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.application.idea_and_criteria
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.idea_and_criteria ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.idea_and_criteria ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.idea
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.idea ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.idea ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.keyword
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.keyword ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.keyword ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.kpi
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.kpi ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.kpi ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.project
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.project ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.project ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.project_has_user_role
   ALTER COLUMN user_inum VARCHAR(36) NOT NULL,
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.project_has_user_role ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.project_has_user_role ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.project_has_user_role ADD CONSTRAINT FK_PROJECT_HAS_USER_ROLE_ON_USER_INUM FOREIGN KEY (user_inum) REFERENCES user_entity (id);


ALTER TABLE application.source
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.source ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.source ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);


ALTER TABLE application.vcw
   ALTER COLUMN updated_by VARCHAR(36) NOT NULL,
   ALTER COLUMN created_by VARCHAR(36) NOT NULL;

ALTER TABLE application.vcw ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_CREATED_BY FOREIGN KEY (created_by) REFERENCES entity.user_entity (id);

ALTER TABLE application.vcw ADD CONSTRAINT FK_BUSINESS_MODEL_CANVAS_ON_UPDATED_BY FOREIGN KEY (updated_by) REFERENCES entity.user_entity (id);
