package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "criteria_has_keyword")
public class CriteriaHasKeywordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO: this can probably be one of those join tables instead of an entity

    //TODO: como se implementa zero or many
    @ManyToOne
    @JoinColumn(name="keyword_id")
    private KeywordEntity keyword;

    //TODO: como se implementa zero or many
    @ManyToOne
    @JoinColumn(name="criteria_id")
    private CriteriaEntity criteria;

}
