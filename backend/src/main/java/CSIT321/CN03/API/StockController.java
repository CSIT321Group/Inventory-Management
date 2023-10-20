package CSIT321.CN03.API;

import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * This class serves as a REST Controller responsible for handling stock-related operations.
 * It provides endpoints for retrieving stock information, searching for stock items, and more.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    /**
     * Retrieves stock information by its unique identifier.
     *
     * @param id The ID of the stock item to retrieve.
     * @return The stock item object with the specified ID.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    /**
     * Retrieves a list of all stock items.
     *
     * @return A list of all stock items in the system.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<Stock> getAllStock() {
        return stockService.getAllStock();
    }

    /**
     * Searches for stock items based on the provided search text.
     *
     * @param searchText The text used to search for stock items.
     * @return A list of stock items that match the search criteria.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/search/{searchText}")
    public List<Stock> search(@PathVariable String searchText) {
        return stockService.search(searchText);
    }

    /**
     * Assigns a supplier to a stock item.
     *
     * @param stockId    The ID of the stock item to which the supplier will be assigned.
     * @param supplierId The ID of the supplier to be assigned to the stock item.
     * @return A ResponseEntity containing the updated stock item.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PutMapping("/{stockId}/supplier/{supplierId}")
    public ResponseEntity<Stock> assignSupplierToStock(@PathVariable Long stockId, @PathVariable Long supplierId) {
        Stock stock = stockService.assignSupplierToStock(stockId, supplierId);
        return ResponseEntity.ok(stock);
    }

    /**
     * Retrieves a list of the top 10 lowest stocked items.
     *
     * @return A list of the top 10 stock items with the lowest inventory levels.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/lowest")
    public List<Stock> getTop10LowestStockedItems() {
        return stockService.getTop10LowestStockedItems();
    }

    /**
     * Retrieves a list of random stock items.
     *
     * @return A list of random stock items from the inventory.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/random")
    public List<Stock> getRandomStockItems() {
        return stockService.getRandomStockItems();
    }
}
