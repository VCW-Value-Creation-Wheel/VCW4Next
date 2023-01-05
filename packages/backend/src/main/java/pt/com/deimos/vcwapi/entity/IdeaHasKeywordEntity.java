package pt.com.deimos.vcwapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "idea_has_keyword")
public class IdeaHasKeywordEntity {

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
    @JoinColumn(name="idea_id")
    private IdeaEntity idea;


}
