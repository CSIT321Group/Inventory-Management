package CSIT321.CN03.Config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuditAspect {

    private static final Logger logger = LoggerFactory.getLogger(AuditAspect.class);

    @Around("execution(* CSIT321.CN03..*Controller.*(..)) && args(@org.springframework.web.bind.annotation.RequestBody body,..)")
    public Object logDatabaseOperation(ProceedingJoinPoint joinPoint, Object body) throws Throwable {
        // Extract JWT or username from the security context
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth != null ? auth.getName() : "UNKNOWN";

        String methodName = joinPoint.getSignature().getName();

        // Log the JSON body
        if (body != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonBody = objectMapper.writeValueAsString(body);
                logger.info("User {} called method {} with JSON Body: {}", username, methodName, jsonBody);
            } catch (Exception e) {
                logger.error("Error converting request body to JSON", e);
            }
        } else {
            logger.info("User {} called method {} with no JSON Body", username, methodName);
        }

        Object result = joinPoint.proceed();

        logger.info("Method {} returned {}", methodName, result);

        return result;
    }
}
