-- TODO: Where should i place this file when it is complete?
-- TODO: anavnet has many SEQUENCES for ids, do we need that here?

CREATE SCHEMA application AUTHORIZATION postgres;


CREATE TABLE application.business_model_canvas (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   customer_segments TEXT,
   value_propositions TEXT,
   channels TEXT,
   customer_relationships TEXT,
   revenue_streams TEXT,
   key_resources TEXT,
   key_activities TEXT,
   key_partnerships TEXT,
   cost_structure TEXT,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   CONSTRAINT pk_business_model_canvas PRIMARY KEY (id)
);


CREATE TABLE application.entry_type (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   CONSTRAINT pk_entry_type PRIMARY KEY (id)
);


CREATE TABLE application.source (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   url VARCHAR(255),
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   CONSTRAINT pk_source PRIMARY KEY (id)
);


CREATE TABLE application.file (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(1024) NOT NULL,
   path VARCHAR(255) NOT NULL,
   file_type VARCHAR(255),
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   CONSTRAINT pk_file PRIMARY KEY (id)
);


CREATE TABLE application.keyword (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   word VARCHAR(128) NOT NULL,
   lang VARCHAR(128) NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   CONSTRAINT pk_keyword PRIMARY KEY (id)
);


CREATE TABLE application.phase (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   "order" INTEGER NOT NULL,
   code VARCHAR(2) NOT NULL,
   name VARCHAR(128) NOT NULL,
   description VARCHAR(2048),
   part_of_sprint BOOLEAN NOT NULL,
   CONSTRAINT pk_phase PRIMARY KEY (id)
);


CREATE TABLE application.role (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(128) NOT NULL,
   description VARCHAR(2048),
   CONSTRAINT pk_role PRIMARY KEY (id)
);


CREATE TABLE application.criteria (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(128) NOT NULL,
   value_type VARCHAR(128) NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   entry_type_id BIGINT NOT NULL,
   criteria_id BIGINT NOT NULL,
   source_id BIGINT,
   CONSTRAINT pk_criteria PRIMARY KEY (id),
   CONSTRAINT FK_CRITERIA_ON_ENTRY_TYPE FOREIGN KEY (entry_type_id) REFERENCES application.entry_type (id),
   CONSTRAINT FK_CRITERIA_ON_SOURCE FOREIGN KEY (source_id) REFERENCES application.source (id)
);


CREATE TABLE application.criteria_has_keyword (
  criteria_id BIGINT NOT NULL,
   keyword_id BIGINT NOT NULL,
   CONSTRAINT pk_criteria_has_keyword PRIMARY KEY (criteria_id, keyword_id),
   CONSTRAINT fk_crihaskey_on_criteria_entity FOREIGN KEY (criteria_id) REFERENCES application.criteria (id),
   CONSTRAINT fk_crihaskey_on_keyword_entity FOREIGN KEY (keyword_id) REFERENCES application.keyword (id)
);


CREATE TABLE application.idea (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(128) NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   entry_type_id BIGINT NOT NULL,
   source_id BIGINT,
   idea_id BIGINT NOT NULL,
   CONSTRAINT pk_idea PRIMARY KEY (id),
   CONSTRAINT FK_IDEA_ON_SOURCE FOREIGN KEY (source_id) REFERENCES application.source (id),
   CONSTRAINT FK_IDEA_ON_ENTRY_TYPE FOREIGN KEY (entry_type_id) REFERENCES application.entry_type (id)
);


CREATE TABLE application.idea_and_criteria (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   value FLOAT,
   value_source INTEGER,
   value_updated_at TIMESTAMP WITHOUT TIME ZONE,
   vcf_result BOOLEAN,
   mcda_result FLOAT,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   idea_id BIGINT NOT NULL,
   criteria_id BIGINT NOT NULL,
   source_id BIGINT,
   CONSTRAINT pk_idea_and_criteria PRIMARY KEY (id),
   CONSTRAINT FK_IDEA_AND_CRITERIA_ON_IDEA FOREIGN KEY (idea_id) REFERENCES application.idea (id),
   CONSTRAINT FK_IDEA_AND_CRITERIA_ON_CRITERIA FOREIGN KEY (criteria_id) REFERENCES application.criteria (id),
   CONSTRAINT FK_IDEA_AND_CRITERIA_ON_SOURCE FOREIGN KEY (source_id) REFERENCES application.source (id)
);


CREATE TABLE application.idea_has_keyword (
  idea_id BIGINT NOT NULL,
   keyword_id BIGINT NOT NULL,
   CONSTRAINT pk_idea_has_keyword PRIMARY KEY (idea_id, keyword_id),
   CONSTRAINT fk_idehaskey_on_idea_entity FOREIGN KEY (idea_id) REFERENCES application.idea (id),
   CONSTRAINT fk_idehaskey_on_keyword_entity FOREIGN KEY (keyword_id) REFERENCES application.keyword (id)
);


CREATE TABLE application.vcw (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   title VARCHAR(128) NOT NULL,
   "type" VARCHAR(10) NOT NULL,
   challenge TEXT,
   concept TEXT,
   value_proposition VARCHAR(255),
   prototype TEXT,
   three_ms TEXT,
   executive_summary TEXT,
   closed BOOLEAN,
   closed_at TIMESTAMP WITHOUT TIME ZONE,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   business_model_canvas_id BIGINT,
   CONSTRAINT pk_vcw PRIMARY KEY (id),
   CONSTRAINT FK_VCW_ON_BUSINESS_MODEL_CANVAS FOREIGN KEY (business_model_canvas_id) REFERENCES application.business_model_canvas (id)
);


CREATE TABLE application.kpi (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   name VARCHAR(255),
   description TEXT,
   evaluation TEXT,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   vcw_id BIGINT NOT NULL,
   CONSTRAINT pk_kpi PRIMARY KEY (id),
   CONSTRAINT FK_KPI_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id)
);


CREATE TABLE application.project (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   title VARCHAR(128) NOT NULL,
   description VARCHAR(2048) NOT NULL,
   lang VARCHAR(128) NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   thumbnail BIGINT,
   CONSTRAINT pk_project PRIMARY KEY (id),
   CONSTRAINT FK_PROJECT_ON_THUMBNAIL FOREIGN KEY (thumbnail) REFERENCES application.file (id)
);


CREATE TABLE application.project_has_keyword (
  keyword_id BIGINT NOT NULL,
   project_id BIGINT NOT NULL,
   CONSTRAINT pk_project_has_keyword PRIMARY KEY (keyword_id, project_id),
   CONSTRAINT fk_prohaskey_on_project_entity FOREIGN KEY (project_id) REFERENCES application.project (id),
   CONSTRAINT fk_prohaskey_on_keyword_entity FOREIGN KEY (keyword_id) REFERENCES application.keyword (id)
);


CREATE TABLE application.project_has_user_role (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   user_inum UUID NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   project_id BIGINT NOT NULL,
   role_id BIGINT NOT NULL,
   CONSTRAINT pk_project_has_user_role PRIMARY KEY (id),
   CONSTRAINT FK_PROJECT_HAS_USER_ROLE_ON_PROJECT FOREIGN KEY (project_id) REFERENCES application.project (id),
   CONSTRAINT FK_PROJECT_HAS_USER_ROLE_ON_ROLE FOREIGN KEY (role_id) REFERENCES application.role (id)
);


CREATE TABLE application.project_has_vcw (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   vcw_id BIGINT NOT NULL,
   project_id BIGINT NOT NULL,
   CONSTRAINT pk_project_has_vcw PRIMARY KEY (id),
   CONSTRAINT FK_PROJECT_HAS_VCW_ON_PROJECT FOREIGN KEY (project_id) REFERENCES application.project (id),
   CONSTRAINT FK_PROJECT_HAS_VCW_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id)
);


CREATE TABLE application.attachment (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   file_id BIGINT NOT NULL,
   vcw_id BIGINT NOT NULL,
   CONSTRAINT pk_attachment PRIMARY KEY (id),
   CONSTRAINT FK_ATTACHMENT_ON_FILE FOREIGN KEY (file_id) REFERENCES application.file (id),
   CONSTRAINT FK_ATTACHMENT_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id)
);


CREATE TABLE application.diagnostic (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   swot_field VARCHAR(128) NOT NULL,
   title VARCHAR(128) NOT NULL,
   description VARCHAR(1024),
   created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   created_by UUID,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   updated_by UUID,
   vcw_id BIGINT NOT NULL,
   CONSTRAINT pk_diagnostic PRIMARY KEY (id),
   CONSTRAINT FK_DIAGNOSTIC_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id)
);


CREATE TABLE application.vcw_has_criteria (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   selected BOOLEAN,
   type VARCHAR(255),
   ranking INTEGER,
   weight FLOAT,
   interval_min FLOAT,
   interval_max FLOAT,
   vcw_id BIGINT NOT NULL,
   criteria_id BIGINT NOT NULL,
   CONSTRAINT pk_vcw_has_criteria PRIMARY KEY (id),
   CONSTRAINT FK_VCW_HAS_CRITERIA_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id),
   CONSTRAINT FK_VCW_HAS_CRITERIA_ON_CRITERIA FOREIGN KEY (criteria_id) REFERENCES application.criteria (id)
);


CREATE TABLE application.vcw_has_idea (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   selected BOOLEAN,
   vcw_id BIGINT NOT NULL,
   idea_id BIGINT NOT NULL,
   CONSTRAINT pk_vcw_has_idea PRIMARY KEY (id),
   CONSTRAINT FK_VCW_HAS_IDEA_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id),
   CONSTRAINT FK_VCW_HAS_IDEA_ON_IDEA FOREIGN KEY (idea_id) REFERENCES application.idea (id)
);


CREATE TABLE application.vcw_has_phase (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   started BOOLEAN NOT NULL,
   locked BOOLEAN NOT NULL,
   phase_id BIGINT NOT NULL,
   vcw_id BIGINT NOT NULL,
   CONSTRAINT pk_vcw_has_phase PRIMARY KEY (id),
   CONSTRAINT FK_VCW_HAS_PHASE_ON_VCW FOREIGN KEY (vcw_id) REFERENCES application.vcw (id),
   CONSTRAINT FK_VCW_HAS_PHASE_ON_PHASE FOREIGN KEY (phase_id) REFERENCES application.phase (id)
);