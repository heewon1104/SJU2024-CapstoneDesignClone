package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.RequestSaveRecordDto;
import org.example.capstonenewri.Entity.Diet;

public interface RecordService {
    Diet saveDiet(RequestSaveRecordDto requestSaveRecordDto); // diet 기록 요청
    void saveDietDiary(Diet diet); // diet 기반으로 dietdiary 저장
}
