package CSIT321.CN03.API;

import CSIT321.CN03.Model.Enums.Order_Status;
import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order newOrder = orderService.createOrder(order);
        return ResponseEntity.ok(newOrder);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PutMapping("/{orderId}/supplier/{supplierId}")
    public ResponseEntity<Order> assignSupplierToOrder(@PathVariable Long orderId, @PathVariable Long supplierId) {
        Order order = orderService.assignSupplierToOrder(orderId, supplierId);
        return ResponseEntity.ok(order);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PutMapping("/{orderId}/status/supplier")
    public ResponseEntity<Order> updateOrderStatusBySupplier(@PathVariable Long orderId, @RequestBody Order_Status status) {
        Order order = orderService.updateOrderStatusBySupplier(orderId, status);
        return ResponseEntity.ok(order);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PutMapping("/{orderId}/status/warehouse")
    public ResponseEntity<Order> updateOrderStatusByWarehouse(@PathVariable Long orderId, @RequestBody Order_Status status) {
        Order order = orderService.updateOrderStatusByWarehouse(orderId, status);
        return ResponseEntity.ok(order);
    }

    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId) {
        Order order = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(order);
    }
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/top-selling-items")
    public List<Map<String, Object>> getTopSellingItems() {
        return orderService.getTopSellingItemsByFrequency();
    }
}
