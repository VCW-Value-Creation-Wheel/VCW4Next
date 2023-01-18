-- application.business_model_canvas definition

-- Drop table

-- DROP TABLE application.business_model_canvas;

CREATE TABLE application.business_model_canvas (
	id serial NOT NULL,
	customer_segments text NULL,
	value_propositions jsonb NULL,
	channels text NULL,
	customer_relationships text NULL,
	revenue_streams text NULL,
	key_resources text NULL,
	key_activities text NULL,
	key_partnerships text NULL,
	cost_structure text NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	CONSTRAINT pk_business_model_canvas PRIMARY KEY (id),
	CONSTRAINT fk_business_model_canvas_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_business_model_canvas_on_updated_by FOREIGN KEY (updated_by)
        REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- application.entry_type definition

-- Drop table

-- DROP TABLE application.entry_type;

CREATE TABLE application.entry_type (
	id serial NOT NULL,
	name varchar(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	CONSTRAINT pk_entry_type PRIMARY KEY (id),
	CONSTRAINT fk_entry_type_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_entry_type_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application."source" definition

-- Drop table

-- DROP TABLE application."source";

CREATE TABLE application."source" (
	id serial NOT NULL,
	name varchar(255) NOT NULL,
	description varchar(255) NULL,
	url varchar(255) NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	CONSTRAINT pk_source PRIMARY KEY (id),
	CONSTRAINT fk_source_on_created_by FOREIGN KEY (created_by)
        REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_source_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application.file definition

-- Drop table

-- DROP TABLE application.file;

CREATE TABLE application.file (
	id serial NOT NULL,
	name varchar(1024) NOT NULL,
	path varchar(255) NOT NULL,
	file_type varchar(255) NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	CONSTRAINT pk_file PRIMARY KEY (id),
	CONSTRAINT fk_file_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_file_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application.keyword definition

-- Drop table

-- DROP TABLE application.keyword;

CREATE TABLE application.keyword (
	id serial NOT NULL,
	word varchar(128) NOT NULL,
	lang varchar(128) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	CONSTRAINT pk_keyword PRIMARY KEY (id),
	CONSTRAINT fk_keyword_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_keyword_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- application.phase definition

-- Drop table

-- DROP TABLE application.phase;

CREATE TABLE application.phase (
	id serial NOT NULL,
	"order" int4 NOT NULL,
	code varchar(2) NOT NULL,
	name varchar(128) NOT NULL,
	description varchar(2048) NULL,
	part_of_sprint bool NOT NULL,
	CONSTRAINT pk_phase PRIMARY KEY (id)
);


-- application."role" definition

-- Drop table

-- DROP TABLE application."role";

CREATE TABLE application.role (
	id serial NOT NULL,
	name varchar(128) NOT NULL,
	description varchar(2048) NULL,
	CONSTRAINT pk_role PRIMARY KEY (id)
);


-- application.criteria definition

-- Drop table

-- DROP TABLE application.criteria;

CREATE TABLE application.criteria (
	id serial NOT NULL,
	name varchar(128) NOT NULL,
	value_type varchar(128) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	entry_type_id int8 NOT NULL,
	source_id int8 NULL,
	CONSTRAINT pk_criteria PRIMARY KEY (id),
	CONSTRAINT fk_criteria_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_criteria_on_entry_type FOREIGN KEY (entry_type_id)
	    REFERENCES application.entry_type(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_criteria_on_source FOREIGN KEY (source_id)
	    REFERENCES application.source(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_criteria_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application.criteria_has_keyword definition

-- Drop table

-- DROP TABLE application.criteria_has_keyword;

CREATE TABLE application.criteria_has_keyword (
	id serial NOT NULL,
	criteria_id int8 NOT NULL,
	keyword_id int8 NOT NULL,
	CONSTRAINT pk_criteria_has_keyword PRIMARY KEY (id),
	CONSTRAINT fk_crihaskey_on_criteria_entity FOREIGN KEY (criteria_id)
	    REFERENCES application.criteria(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_crihaskey_on_keyword_entity FOREIGN KEY (keyword_id)
	    REFERENCES application.keyword(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.idea definition

-- Drop table

-- DROP TABLE application.idea;

CREATE TABLE application.idea (
	id serial NOT NULL,
	name varchar(128) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	entry_type_id int8 NOT NULL,
	source_id int8 NULL,
	CONSTRAINT pk_idea PRIMARY KEY (id),
	CONSTRAINT fk_idea_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_idea_on_entry_type FOREIGN KEY (entry_type_id)
	    REFERENCES application.entry_type(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_idea_on_source FOREIGN KEY (source_id)
	    REFERENCES application.source(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_idea_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application.idea_and_criteria definition

-- Drop table

-- DROP TABLE application.idea_and_criteria;

CREATE TABLE application.idea_and_criteria (
	id serial NOT NULL,
	"value" float8 NULL,
	value_source int4 NULL,
	value_updated_at timestamp NULL,
	vcf_result bool NULL,
	mcda_result float8 NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	idea_id int8 NOT NULL,
	criteria_id int8 NOT NULL,
	source_id int8 NULL,
	CONSTRAINT pk_idea_and_criteria PRIMARY KEY (id),
	CONSTRAINT fk_idea_and_criteria_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_idea_and_criteria_on_criteria FOREIGN KEY (criteria_id)
	    REFERENCES application.criteria(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_idea_and_criteria_on_idea FOREIGN KEY (idea_id)
	    REFERENCES application.idea(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_idea_and_criteria_on_source FOREIGN KEY (source_id)
	    REFERENCES application.source(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_idea_and_criteria_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- application.idea_has_keyword definition

-- Drop table

-- DROP TABLE application.idea_has_keyword;

CREATE TABLE application.idea_has_keyword (
	id serial NOT NULL,
	idea_id int8 NOT NULL,
	keyword_id int8 NOT NULL,
	CONSTRAINT pk_idea_has_keyword PRIMARY KEY (id),
	CONSTRAINT fk_idehaskey_on_idea_entity FOREIGN KEY (idea_id)
	    REFERENCES application.idea(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_idehaskey_on_keyword_entity FOREIGN KEY (keyword_id)
	    REFERENCES application.keyword(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.vcw definition

-- Drop table

-- DROP TABLE application.vcw;

CREATE TABLE application.vcw (
	id serial NOT NULL,
	name varchar(128) NOT NULL,
	type varchar(10) NOT NULL,
	challenge text NULL,
	concept text NULL,
	value_proposition varchar(255) NULL,
	prototype text NULL,
	three_ms text NULL,
	executive_summary text NULL,
	closed bool NULL,
	closed_at timestamp NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	business_model_canvas_id int8 NULL,
	CONSTRAINT pk_vcw PRIMARY KEY (id),
	CONSTRAINT fk_vcw_on_business_model_canvas FOREIGN KEY (business_model_canvas_id)
	    REFERENCES application.business_model_canvas(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_vcw_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_vcw_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application.kpi definition

-- Drop table

-- DROP TABLE application.kpi;

CREATE TABLE application.kpi (
	id serial NOT NULL,
	name varchar(255) NOT NULL,
	description text NULL,
	evaluation text NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	vcw_id int8 NOT NULL,
	CONSTRAINT pk_kpi PRIMARY KEY (id),
	CONSTRAINT fk_kpi_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_kpi_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_kpi_on_vcw FOREIGN KEY (vcw_id)
	    REFERENCES application.vcw(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.project definition

-- Drop table

-- DROP TABLE application.project;

DROP TABLE application.projects;

CREATE TABLE application.project (
	id serial NOT NULL,
	name varchar(128) NOT NULL,
	description varchar(2048) NOT NULL,
	lang varchar(128) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	thumbnail int8 NULL,
	CONSTRAINT pk_project PRIMARY KEY (id),
	CONSTRAINT fk_project_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_project_on_thumbnail FOREIGN KEY (thumbnail)
	    REFERENCES application.file(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_project_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- application.project_has_keyword definition

-- Drop table

-- DROP TABLE application.project_has_keyword;

CREATE TABLE application.project_has_keyword (
	id serial NOT NULL,
	keyword_id int8 NOT NULL,
	project_id int8 NOT NULL,
	CONSTRAINT pk_project_has_keyword PRIMARY KEY (id),
	CONSTRAINT fk_prohaskey_on_keyword_entity FOREIGN KEY (keyword_id)
	    REFERENCES application.keyword(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_prohaskey_on_project_entity FOREIGN KEY (project_id)
	    REFERENCES application.project(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.project_has_user_role definition

-- Drop table

-- DROP TABLE application.project_has_user_role;

CREATE TABLE application.project_has_user_role (
	id serial NOT NULL,
	user_inum varchar(36) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	project_id int8 NOT NULL,
	role_id int8 NOT NULL,
	CONSTRAINT pk_project_has_user_role PRIMARY KEY (id),
	CONSTRAINT fk_project_has_user_role_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_project_has_user_role_on_project FOREIGN KEY (project_id)
	    REFERENCES application.project(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_project_has_user_role_on_role FOREIGN KEY (role_id)
	    REFERENCES application.role(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_project_has_user_role_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_project_has_user_role_on_user_inum FOREIGN KEY (user_inum)
	    REFERENCES "identity".user_entity(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.project_has_vcw definition

-- Drop table

-- DROP TABLE application.project_has_vcw;

CREATE TABLE application.project_has_vcw (
	id serial NOT NULL,
	vcw_id int8 NOT NULL,
	project_id int8 NOT NULL,
	CONSTRAINT pk_project_has_vcw PRIMARY KEY (id),
	CONSTRAINT fk_project_has_vcw_on_project FOREIGN KEY (project_id)
	    REFERENCES application.project(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_project_has_vcw_on_vcw FOREIGN KEY (vcw_id)
	    REFERENCES application.vcw(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.attachment definition

-- Drop table

-- DROP TABLE application.attachment;

CREATE TABLE application.attachment (
    id int8 GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    file_id int8 NOT NULL,
    vcw_id int8 NOT NULL,
    CONSTRAINT pk_attachment PRIMARY KEY (id),
    CONSTRAINT FK_ATTACHMENT_ON_FILE FOREIGN KEY (file_id)
        REFERENCES application.file (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_ATTACHMENT_ON_VCW FOREIGN KEY (vcw_id)
        REFERENCES application.vcw (id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.diagnostic definition

-- Drop table

-- DROP TABLE application.diagnostic;

CREATE TABLE application.diagnostic (
	id serial NOT NULL,
	swot_field varchar(128) NOT NULL,
	name varchar(128) NOT NULL,
	description varchar(1024) NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(36) NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by varchar(36) NULL,
	vcw_id int8 NOT NULL,
	CONSTRAINT pk_diagnostic PRIMARY KEY (id),
	CONSTRAINT fk_diagnostic_on_created_by FOREIGN KEY (created_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_diagnostic_on_updated_by FOREIGN KEY (updated_by)
	    REFERENCES "identity".user_entity(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_diagnostic_on_vcw FOREIGN KEY (vcw_id)
	    REFERENCES application.vcw(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.vcw_has_criteria definition

-- Drop table

-- DROP TABLE application.vcw_has_criteria;

CREATE TABLE application.vcw_has_criteria (
	id serial NOT NULL,
	selected bool NULL,
	type varchar(255) NULL,
	ranking int4 NULL,
	weight float8 NULL,
	interval_min float8 NULL,
	interval_max float8 NULL,
	vcw_id int8 NOT NULL,
	criteria_id int8 NOT NULL,
	CONSTRAINT pk_vcw_has_criteria PRIMARY KEY (id),
	CONSTRAINT fk_vcw_has_criteria_on_criteria FOREIGN KEY (criteria_id)
	    REFERENCES application.criteria(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_vcw_has_criteria_on_vcw FOREIGN KEY (vcw_id)
	    REFERENCES application.vcw(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.vcw_has_idea definition

-- Drop table

-- DROP TABLE application.vcw_has_idea;

CREATE TABLE application.vcw_has_idea (
	id serial NOT NULL,
	selected bool NULL,
	vcw_id int8 NOT NULL,
	idea_id int8 NOT NULL,
	CONSTRAINT pk_vcw_has_idea PRIMARY KEY (id),
	CONSTRAINT fk_vcw_has_idea_on_idea FOREIGN KEY (idea_id)
	    REFERENCES application.idea(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_vcw_has_idea_on_vcw FOREIGN KEY (vcw_id)
	    REFERENCES application.vcw(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- application.vcw_has_phase definition

-- Drop table

-- DROP TABLE application.vcw_has_phase;

CREATE TABLE application.vcw_has_phase (
	id serial NOT NULL,
	started bool NOT NULL,
	locked bool NOT NULL,
	phase_id int8 NOT NULL,
	vcw_id int8 NOT NULL,
	CONSTRAINT pk_vcw_has_phase PRIMARY KEY (id),
	CONSTRAINT fk_vcw_has_phase_on_phase FOREIGN KEY (phase_id)
	    REFERENCES application.phase(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_vcw_has_phase_on_vcw FOREIGN KEY (vcw_id)
	    REFERENCES application.vcw(id) ON DELETE CASCADE ON UPDATE CASCADE
);