package CSIT321.CN03.Service;

import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.Stock.StockRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private SupplierService supplierService;


    public Stock getStockById(Long id) {

        return stockRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Stock not found with id: " + id));
    }

    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }

    public List<Stock> search(String searchText) {
        return stockRepository.search(searchText);
    }

    @Transactional
    public Stock assignSupplierToStock(Long stockId, Long supplierId) {
        Stock stock = getStockById(stockId);
        Supplier supplier = supplierService.getSupplierById(supplierId);

        stock.setSupplier(supplier);

        return stockRepository.save(stock);
    }
}

