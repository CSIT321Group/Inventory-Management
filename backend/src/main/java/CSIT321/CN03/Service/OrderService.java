package CSIT321.CN03.Service;

import CSIT321.CN03.Model.Enums.Order_Status;
import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Model.Order.Order_Item;
import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.Order.OrderRepository;
import CSIT321.CN03.Repository.Stock.StockRepository;
import CSIT321.CN03.Repository.SupplierRepository;
import CSIT321.CN03.Repository.WarehouseRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierService supplierService;
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    public Order getOrderById(Long id) {
        return orderRepository.findOrderWithOrderItemsAndPositions(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findOrdersWithOrderItemsAndPositions();
    }

    @Transactional
    public Order createOrder(Order order) {
        // Fetch and set associated entities for each Order_Item
        for (Order_Item orderItem : order.getOrderItems()) {
            // Fetch the Stock entity based on stockId
            Stock stock = stockRepository.findById(orderItem.getStock().getStockId())
                    .orElseThrow(() -> new EntityNotFoundException("Stock not found with ID: " + orderItem.getStock().getStockId()));

            // Set the fetched Stock entity in the Order_Item
            orderItem.setStock(stock);

            // Set the Order reference in the Order_Item
            orderItem.setOrder(order);
        }
        order.setWarehouse(warehouseRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException("Warehouse not found with ID: 1")));
        order.setSupplier(getRandomSupplier());

        // Save the Order, which will also save the associated Order_Item objects
        return orderRepository.save(order);
    }

    @Transactional
    public Order assignSupplierToOrder(Long orderId, Long supplierId) {
        Order order = getOrderById(orderId);
        Supplier supplier = supplierService.getSupplierById(supplierId);

        order.setSupplier(supplier);

        return orderRepository.save(order);
    }

    private Supplier getRandomSupplier() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers.get(new Random().nextInt(suppliers.size()));
    }

    @Transactional
    public Order updateOrderStatusBySupplier(Long orderId, Order_Status status) {
        Order order = getOrderById(orderId);
        if (status == Order_Status.PROCESSING || status == Order_Status.SHIPPED) {
            order.setStatus(status);
        }
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatusByWarehouse(Long orderId, Order_Status status) {
        Order order = getOrderById(orderId);
        if (status == Order_Status.DELIVERED) {
            order.setStatus(status);
        }
        return orderRepository.save(order);
    }

    @Transactional
    public Order cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        order.setStatus(Order_Status.CANCELLED);
        return orderRepository.save(order);
    }

    public List<Map<String, Object>> getTopSellingItemsByFrequency() {
        List<Object[]> results = orderRepository.findTopSellingItemsByFrequency();

        return results.stream()
                .limit(10)
                .map(record -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("stockId", ((Long) record[0]).longValue());
                    item.put("stockName", (String) record[1]);
                    item.put("stockQuantity", ((Number) record[2]).intValue());
                    item.put("supplierName", (String) record[3]);
                    item.put("orderFrequency", ((Number) record[4]).longValue());
                    return item;
                })
                .collect(Collectors.toList());
    }


}

