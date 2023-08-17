package CSIT321.CN03.API;

import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    @GetMapping
    public List<Stock> getAllStock() {
        return stockService.getAllStock();
    }

    @GetMapping("/search/{searchText}")
    public List<Stock> search(@PathVariable String searchText) {
        return stockService.search(searchText);
    }

    @PutMapping("/{stockId}/supplier/{supplierId}")
    public ResponseEntity<Stock> assignSupplierToStock(@PathVariable Long stockId, @PathVariable Long supplierId) {
        Stock stock = stockService.assignSupplierToStock(stockId, supplierId);
        return ResponseEntity.ok(stock);
    }
}
