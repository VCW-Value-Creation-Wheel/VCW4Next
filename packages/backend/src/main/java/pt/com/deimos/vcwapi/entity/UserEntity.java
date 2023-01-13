package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user_entity")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column
    private String email;

    @Column(name = "email_constraint")
    private String emailConstraint;

    @Column(name = "email_verified", columnDefinition = "boolean default false", nullable = false)
    private Boolean emailVerified;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean enabled;

    @Column(name = "federation_link")
    private String federationLink;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "realm_id")
    private String realmId;

    @Column
    private String username;

    @Column(name = "created_timestamp")
    private Long createdTimestamp;

    @Column(name = "service_account_client_link")
    private String serviceAccountClientLink;

    @Column(name = "not_before", columnDefinition = "integer default 0", nullable = false)
    private Integer notBefore;


    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "user")
    private List<ProjectHasUserRoleEntity> userHasProjectHasUserRoleEntities;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<ProjectHasUserRoleEntity> userUpdatedProjectHasUserRoleEntities;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<ProjectHasUserRoleEntity> userCreatedProjectHasUserRoleEntities;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<BusinessModelCanvasEntity> userUpdatedBusinessModelCanvasEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<BusinessModelCanvasEntity> userCreatedBusinessModelCanvasEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<CriteriaEntity> userUpdatedCriteriaEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<CriteriaEntity> userCreatedCriteriaEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<DiagnosticEntity> userUpdatedDiagnosticEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<DiagnosticEntity> userCreatedDiagnosticEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<EntryTypeEntity> userUpdatedEntryTypeEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<EntryTypeEntity> userCreatedEntryTypeEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<FileEntity> userUpdatedFileEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<FileEntity> userCreatedFileEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<IdeaAndCriteriaEntity> userUpdatedIdeaAndCriteriaEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<IdeaAndCriteriaEntity> userCreatedIdeaAndCriteriaEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<IdeaEntity> userUpdatedIdeaEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<IdeaEntity> userCreatedIdeaEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<KeywordEntity> userUpdatedKeywordEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<KeywordEntity> userCreatedKeywordEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<KpiEntity> userUpdatedKpiEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<KpiEntity> userCreatedKpiEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<ProjectEntity> userUpdatedProjectEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<ProjectEntity> userCreatedProjectEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<SourceEntity> userUpdatedSourceEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<SourceEntity> userCreatedSourceEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "updatedBy")
    private List<VcwEntity> userUpdatedVcwEntity;

    //TODO: isto é suposto ser one and only one to zero or many, pls check
    @OneToMany(mappedBy = "createdBy")
    private List<VcwEntity> userCreatedVcwEntity;

}
