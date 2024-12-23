-- add preset data
INSERT INTO application.phase ("order",code,name,description,part_of_sprint) VALUES
	 (1,'1a','Diagnostic','description 1',false),
	 (2,'1b','Challenge','description 2',true),
	 (3,'1c','Expected KPIs','description 3',false),
	 (4,'2a','Ideas','description 4',true),
	 (5,'2b','Criteria','description 5',true),
	 (6,'2c','Purification','description 6',false),
	 (7,'3a','Select Ideas','description 7',true),
	 (8,'3b','Select Criteria','description 8',true),
	 (9,'3c','Rank Weight Criteria','description 9',false),
	 (10,'4a','Value Creation Funnel Page','description 10',true),
	 (11,'4b','Concept & Value Proposition','description 11',false),
	 (12,'4c','Prototype','description 12',false),
	 (13,'5a','3 Ms & Business Model Page','description 13',false),
	 (14,'5b','Test & KPIs Evaluation','description 14',false),
	 (15,'5c','Implementation & Control','description 15',true);

INSERT INTO application."role" (name,description) VALUES
	 ('Coordinator','Coordinator of the VCW project'),
	 ('Key Decision Maker','Key decision maker'),
	 ('Key Decision Maker - PA','Key decision maker - PA'),
	 ('VCW Team Member','VCW team member'),
	 ('Consulted Stakeholder','Consulted stakeholder'),
	 ('IT analyst','IT analyst');

INSERT INTO application.entry_type (name,created_at,created_by,updated_at,updated_by) VALUES
	 ('user','2023-01-19 13:55:59.792777',NULL,'2023-01-19 13:55:59.792777',NULL),
	 ('vcw_project','2023-01-19 13:55:59.816369',NULL,'2023-01-19 13:55:59.816369',NULL),
	 ('third_party','2023-01-19 13:55:59.823746',NULL,'2023-01-19 13:55:59.823746',NULL);

-- create enums  for preset fields
CREATE TYPE SWOT_FIELDS AS ENUM ('strength', 'weakness','opportunity', 'threat');
ALTER TABLE application.diagnostic
    ALTER COLUMN swot_field TYPE SWOT_FIELDS USING swot_field::SWOT_FIELDS;

CREATE TYPE VCW_TYPES AS ENUM ('sprint', 'method');
ALTER TABLE application.vcw
	ALTER COLUMN type TYPE VCW_TYPES USING type::VCW_TYPES;

CREATE TYPE CRITERIA_TYPES AS ENUM ('number', 'yes_or_no');
ALTER TABLE application.criteria
	ALTER COLUMN value_type TYPE CRITERIA_TYPES USING value_type::CRITERIA_TYPES;

-- cast enums to correct type to allow database to receive strings from spring
CREATE CAST (varchar AS SWOT_FIELDS) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS VCW_TYPES) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS CRITERIA_TYPES) WITH INOUT AS IMPLICIT;