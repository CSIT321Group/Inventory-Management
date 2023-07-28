package CSIT321.CN03.Service;

import CSIT321.CN03.Model.Stock;
import CSIT321.CN03.Repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;


    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }
}
