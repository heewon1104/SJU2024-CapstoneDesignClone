package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.ResponseFeedbackFromLLMDto;
import org.example.capstonenewri.Entity.Diet;
import java.util.List;

public interface DrawFeedbackService {
    void drawFeedback(List<Diet> dietList, String email);
}
