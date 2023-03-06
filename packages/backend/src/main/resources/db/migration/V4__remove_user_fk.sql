ALTER TABLE application.business_model_canvas
    DROP CONSTRAINT fk_business_model_canvas_on_created_by,
    DROP CONSTRAINT fk_business_model_canvas_on_updated_by;

ALTER TABLE application.entry_type
    DROP CONSTRAINT fk_entry_type_on_created_by,
    DROP CONSTRAINT fk_entry_type_on_updated_by;

ALTER TABLE application.source
    DROP CONSTRAINT fk_source_on_created_by,
    DROP CONSTRAINT fk_source_on_updated_by;

ALTER TABLE application.file
    DROP CONSTRAINT fk_file_on_created_by,
    DROP CONSTRAINT fk_file_on_updated_by;

ALTER TABLE application.keyword
    DROP CONSTRAINT fk_keyword_on_created_by,
    DROP CONSTRAINT fk_keyword_on_updated_by;

ALTER TABLE application.criteria
    DROP CONSTRAINT fk_criteria_on_created_by,
    DROP CONSTRAINT fk_criteria_on_updated_by;

ALTER TABLE application.idea
    DROP CONSTRAINT fk_idea_on_created_by,
    DROP CONSTRAINT fk_idea_on_updated_by;

ALTER TABLE application.idea_and_criteria
  DROP CONSTRAINT fk_idea_and_criteria_on_created_by,
  DROP CONSTRAINT fk_idea_and_criteria_on_updated_by;

ALTER TABLE application.vcw
  DROP CONSTRAINT fk_vcw_on_created_by,
  DROP CONSTRAINT fk_vcw_on_updated_by;

ALTER TABLE application.kpi
  DROP CONSTRAINT fk_kpi_on_created_by,
  DROP CONSTRAINT fk_kpi_on_updated_by;

ALTER TABLE application.project
  DROP CONSTRAINT fk_project_on_created_by,
  DROP CONSTRAINT fk_project_on_updated_by;

ALTER TABLE application.project_has_user_role
  DROP CONSTRAINT fk_project_has_user_role_on_created_by,
  DROP CONSTRAINT fk_project_has_user_role_on_updated_by,
  DROP CONSTRAINT fk_project_has_user_role_on_user_inum;

ALTER TABLE application.diagnostic
  DROP CONSTRAINT fk_diagnostic_on_created_by,
  DROP CONSTRAINT fk_diagnostic_on_updated_by;
