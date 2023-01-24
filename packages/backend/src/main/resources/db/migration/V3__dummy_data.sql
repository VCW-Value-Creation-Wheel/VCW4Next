INSERT INTO application.file (name,"path",file_type,created_at,created_by,updated_at,updated_by) VALUES
	 ('project 1 report','myfiles/p1_report.pdf','pdf','2023-01-19 11:25:30.935302','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 11:25:30.935302','b68986e1-81d8-4813-ada5-172442d8944d');

INSERT INTO application.business_model_canvas (customer_segments,value_propositions,channels,customer_relationships,revenue_streams,key_resources,key_activities,key_partnerships,cost_structure,created_at,created_by,updated_at,updated_by) VALUES
	 ('test','test','test','test','test','test','test','test','test','2023-01-19 12:18:55.426691','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:18:55.426691','b68986e1-81d8-4813-ada5-172442d8944d');

INSERT INTO application.vcw (name,"type",challenge,concept,value_proposition,prototype,three_ms,executive_summary,closed,closed_at,created_at,created_by,updated_at,updated_by,business_model_canvas_id) VALUES
	 ('VCW 1','sprint','challenge 1','concept 1','{"description":"value proposition 1"}','prototype 1','something','this is a sprint vcw',false,NULL,'2023-01-19 12:19:18.516103','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:19:18.516103','b68986e1-81d8-4813-ada5-172442d8944d',1),
	 ('VCW 2','method','challenge 2','concept 2','{"description":"value proposition 2"}','prototype 2','something','this is a method vcw',false,NULL,'2023-01-19 12:19:18.516103','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:19:18.516103','b68986e1-81d8-4813-ada5-172442d8944d',NULL);

INSERT INTO application.attachment (file_id,vcw_id) VALUES
	 (1,1);

INSERT INTO application.diagnostic (swot_field,name,description,created_at,created_by,updated_at,updated_by,vcw_id) VALUES
	 ('strength','Easy','Easy to find','2023-01-19 12:22:04.20509','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:22:04.20509','b68986e1-81d8-4813-ada5-172442d8944d',1),
	 ('weakness','Cost','Very expensive','2023-01-19 12:22:04.244157','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:22:04.244157','b68986e1-81d8-4813-ada5-172442d8944d',1),
	 ('threat','Crabs','They are chasing me help','2023-01-19 12:22:04.326024','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:22:04.326024','b68986e1-81d8-4813-ada5-172442d8944d',1),
	 ('opportunity','Crabs','They are quite nutritious','2023-01-19 12:22:04.343762','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:22:04.343762','b68986e1-81d8-4813-ada5-172442d8944d',1);

INSERT INTO application.entry_type (name,created_at,created_by,updated_at,updated_by) VALUES
	 ('user','2023-01-19 13:55:59.792777','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:55:59.792777','b68986e1-81d8-4813-ada5-172442d8944d'),
	 ('vcw_project','2023-01-19 13:55:59.816369','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:55:59.816369','b68986e1-81d8-4813-ada5-172442d8944d'),
	 ('third_party','2023-01-19 13:55:59.823746','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:55:59.823746','b68986e1-81d8-4813-ada5-172442d8944d');


INSERT INTO application.keyword (word,lang,created_at,created_by,updated_at,updated_by) VALUES
	 ('beach','english','2023-01-19 14:07:17.606139','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 14:07:17.606139','b68986e1-81d8-4813-ada5-172442d8944d'),
	 ('food','english','2023-01-19 14:08:00.725105','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 14:08:00.725105','b68986e1-81d8-4813-ada5-172442d8944d');

INSERT INTO application.kpi
(name,description,evaluation,created_at,created_by,updated_at,updated_by,vcw_id) VALUES
	 ('Costs','costs','test1','2023-01-19 12:24:33.16624','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:24:33.16624','b68986e1-81d8-4813-ada5-172442d8944d',1),
	 ('Profits','profits','test2','2023-01-19 12:24:33.185509','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:24:33.185509','b68986e1-81d8-4813-ada5-172442d8944d',1);

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

INSERT INTO application.project (name,description,lang,created_at,created_by,updated_at,updated_by,thumbnail) VALUES
	 ('Project 1','project 1 description','english','2023-01-19 11:28:54.867776','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 11:28:54.867776','b68986e1-81d8-4813-ada5-172442d8944d',1),
	 ('Project 2','project 2 description','portuguese','2023-01-19 11:28:54.911776','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 11:28:54.911776','b68986e1-81d8-4813-ada5-172442d8944d',NULL);

INSERT INTO application.project_has_keyword (keyword_id,project_id) VALUES
	 (1,1);

INSERT INTO application."role" (name,description) VALUES
	 ('Coordinator','Coordinator of the VCW project'),
	 ('Key Decision Maker','Key decision maker'),
	 ('Key Decision Maker - PA','Key decision maker - PA'),
	 ('VCW Team Member','VCW team member'),
	 ('Consulted Stakeholder','Consulted stakeholder'),
	 ('IT analyst','IT analyst');

INSERT INTO application.project_has_user_role (user_inum,created_at,created_by,updated_at,updated_by,project_id,role_id) VALUES
	 ('b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:02:56.176465','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 12:02:56.176465','b68986e1-81d8-4813-ada5-172442d8944d',1,2);

INSERT INTO application.project_has_vcw (vcw_id,project_id) VALUES
	 (1,1),
	 (2,2);

INSERT INTO application."source" (name,description,url,created_at,created_by,updated_at,updated_by) VALUES
	 ('Trivago','Hotel?','www.trivago.com','2023-01-19 13:54:59.552702','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:54:59.552702','b68986e1-81d8-4813-ada5-172442d8944d'),
	 ('Brainstorming','my brain',NULL,'2023-01-19 13:57:31.916242','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:57:31.916242','b68986e1-81d8-4813-ada5-172442d8944d');

INSERT INTO application.criteria (name,value_type,created_at,created_by,updated_at,updated_by,entry_type_id,source_id) VALUES
	 ('Distance from ocean','number','2023-01-19 13:56:14.726723','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:56:14.726723','b68986e1-81d8-4813-ada5-172442d8944d',3,1),
	 ('Breakfast included','yes_or_no','2023-01-19 13:56:14.73681','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:56:14.73681','b68986e1-81d8-4813-ada5-172442d8944d',3,1);

INSERT INTO application.criteria_has_keyword (criteria_id,keyword_id) VALUES
	 (1,1),
	 (2,2);

INSERT INTO application.idea (name,created_at,created_by,updated_at,updated_by,entry_type_id,source_id) VALUES
	 ('Beach Holiday','2023-01-19 13:57:44.186177','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 13:57:44.186177','b68986e1-81d8-4813-ada5-172442d8944d',1,2);

INSERT INTO application.idea_and_criteria (value,value_updated_at,vcf_result,mcda_result,created_at,created_by,updated_at,updated_by,idea_id,criteria_id,source_id) VALUES
	 (5.0,'2023-01-19 14:06:17.26',false,NULL,'2023-01-19 14:06:17.260641','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 14:06:17.260641','b68986e1-81d8-4813-ada5-172442d8944d',1,1,1),
	 (2.0,'2023-01-19 14:06:17.26',false,NULL,'2023-01-19 14:06:17.287287','b68986e1-81d8-4813-ada5-172442d8944d','2023-01-19 14:06:17.287287','b68986e1-81d8-4813-ada5-172442d8944d',1,2,1);

INSERT INTO application.idea_has_keyword (idea_id,keyword_id) VALUES
	 (1,1);

INSERT INTO application.vcw_has_criteria (selected,"type",ranking,weight,interval_min,interval_max,vcw_id,criteria_id) VALUES
	 (true,'must_have',1,5.0,0.0,1000.0,1,1),
	 (true,'nice_to_have',2,2.0,NULL,NULL,1,2);

INSERT INTO application.vcw_has_idea (selected,vcw_id,idea_id) VALUES
	 (true,1,1);

INSERT INTO application.vcw_has_phase (started,"locked",phase_id,vcw_id) VALUES
	 (true,true,2,1),
	 (true,true,4,1),
	 (true,false,5,1),
	 (true,false,9,2),
	 (false,false,10,2);
