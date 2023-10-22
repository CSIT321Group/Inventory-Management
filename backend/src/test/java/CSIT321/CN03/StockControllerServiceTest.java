package CSIT321.CN03;

import CSIT321.CN03.API.StockController;
import CSIT321.CN03.Model.Stock.RawMaterial;
import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Repository.Stock.StockRepository;
import CSIT321.CN03.Service.StockService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class StockControllerServiceTest {

    @Mock
    private StockService mockStockService;

    @InjectMocks
    private StockController stockController;

    private Stock testStock;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        testStock = new RawMaterial();
        testStock.setStockId(1L);
    }

    @Test
    public void testGetStockById() {
        when(mockStockService.getStockById(1L)).thenReturn(testStock);

        Stock result = stockController.getStockById(1L);

        assertEquals(testStock, result);
    }

    @Test
    public void testGetAllStock() {
        when(mockStockService.getAllStock()).thenReturn(Arrays.asList(testStock));

        List<Stock> result = stockController.getAllStock();

        assertEquals(1, result.size());
        assertEquals(testStock, result.get(0));
    }

    @Test
    public void testSearch() {
        String searchText = "test";
        when(mockStockService.search(searchText)).thenReturn(Arrays.asList(testStock));

        List<Stock> result = stockController.search(searchText);

        assertEquals(1, result.size());
        assertEquals(testStock, result.get(0));
    }

    @Test
    public void testAssignSupplierToStock() {
        Long supplierId = 2L;
        when(mockStockService.assignSupplierToStock(testStock.getStockId(), supplierId)).thenReturn(testStock);

        ResponseEntity<Stock> result = stockController.assignSupplierToStock(testStock.getStockId(), supplierId);

        assertEquals(200, result.getStatusCodeValue());
        assertEquals(testStock, result.getBody());
    }

}
