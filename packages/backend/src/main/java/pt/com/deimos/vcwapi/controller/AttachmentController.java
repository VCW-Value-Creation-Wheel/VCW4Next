package pt.com.deimos.vcwapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.repository.VcwRepository;
import pt.com.deimos.vcwapi.service.AttachmentService;
import pt.com.deimos.vcwapi.service.AttachmentService;
import pt.com.deimos.vcwapi.service.VcwService;

@RestController
@RequestMapping("/v1/projects/{project_id}/attachments")
public class AttachmentController {

    @Autowired
    private VcwService vcwService;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private VcwRepository vcwRepository;

    @GetMapping("/{vcw_id}")
    @Operation(summary = "Show vcw attachment.")
    public ResponseEntity<Object> getAttachment(
            @PathVariable(value = "vcw_id") Long vcwId,
            @AuthenticationPrincipal Jwt principal) {

        Optional<VcwEntity> vcw =
                this.vcwRepository.findById(vcwId) ;
        if (vcw.isEmpty())
            throw new NotFoundException("Vcw not found.");

        return ResponseEntity.ok(this.attachmentService.getByVcwId(vcwId));
    }
    
    @PostMapping("/{vcw_id}")
    @Operation(summary = "Create vcw attachment .")
    public ResponseEntity<Object> saveAttachment(
           @PathVariable(value = "vcw_id") Long vcwId,
           @RequestPart(required = true) MultipartFile attachment,
           @AuthenticationPrincipal Jwt principal
    ) {

        if(attachment.isEmpty())
            throw new BadRequestException("Invalid input attachment.");

        Optional<VcwEntity> vcwOptional = this.vcwService.findById(
                vcwId);
        if (vcwOptional.isEmpty())
            throw new NotFoundException("Vcw not found.");

        return ResponseEntity.status(HttpStatus.CREATED).body(
                this.attachmentService.saveAttachment(principal.getSubject(), vcwOptional.get(), attachment));
    }

    @PutMapping("/{vcw_id}/{attachment_id}")
    @Operation(summary = "Updates the vcw attachment.")
    public ResponseEntity<Object> updateAttachment(
            @PathVariable(value = "vcw_id") Long vcwId,
            @PathVariable(value = "attachment_id") Long attachmentId,
            @RequestPart(required = true) MultipartFile attachment,
            @AuthenticationPrincipal Jwt principal
    ) {

        if (attachment.isEmpty()) 
            throw new BadRequestException("Invalid input attachment.");

        Optional<VcwEntity> vcw = this.vcwService.findById(
                vcwId);
        if (vcw.isEmpty())
            throw new NotFoundException("Vcw not found.");

        Optional<FileEntity> oldAttachment =
                this.attachmentService.getByIdAndVcwId(attachmentId, vcwId);
        if (oldAttachment.isEmpty())
            throw new NotFoundException("Attachment not found.");

        return ResponseEntity.status(HttpStatus.OK).body(
                this.attachmentService.update(principal.getSubject(),
                        oldAttachment.get(), attachment));
    }

    @DeleteMapping("/{vcw_id}/{attachment_id}")
    @Operation(summary = "Deletes the vcw attachment.")
    public ResponseEntity<Object> deleteAttachment(
            @PathVariable(value = "vcw_id") Long vcwId,
            @PathVariable(value = "attachment_id") Long attachmentId,
            @AuthenticationPrincipal Jwt principal) {

        Optional<VcwEntity> vcw = this.vcwService.findById(
                vcwId);
        if (vcw.isEmpty())
            throw new NotFoundException("Vcw not found.");

        Optional<FileEntity> attachment =
                this.attachmentService.getByIdAndVcwId(attachmentId, vcwId);
        if (attachment.isEmpty())
            throw new NotFoundException("Attachment not found.");

        this.attachmentService.delete(attachment.get());

        return ResponseEntity.noContent().build();
    }


}
