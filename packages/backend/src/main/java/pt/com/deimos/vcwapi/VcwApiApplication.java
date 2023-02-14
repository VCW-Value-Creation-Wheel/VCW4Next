package pt.com.deimos.vcwapi;

import org.springframework.aot.hint.annotation.RegisterReflectionForBinding;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@RegisterReflectionForBinding
public class VcwApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(VcwApiApplication.class, args);
	}

}
