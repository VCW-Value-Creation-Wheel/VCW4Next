package pt.com.deimos.vcwapi.controller.prototype;

import java.util.List;

import lombok.Data;

import pt.com.deimos.vcwapi.entity.IdeaEntity;


@Data
public class Idea {

    IdeaEntity i;

    List<Criteria> cs;

}
