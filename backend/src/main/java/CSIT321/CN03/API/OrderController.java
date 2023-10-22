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


    /**
     * Retrieves an order by its unique identifier.
     *
     * @param id The ID of the order to retrieve.
     * @return The order object with the specified ID.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }


    /**
     * Retrieves a list of all orders.
     *
     * @return A list of all orders in the system.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }


    /**
     * Creates a new order.
     *
     * @param order The order object to be created.
     * @return A ResponseEntity containing the newly created order.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order newOrder = orderService.createOrder(order);
        return ResponseEntity.ok(newOrder);
    }

    /**
     * Assigns a supplier to an order.
     *
     * @param orderId    The ID of the order to which the supplier will be assigned.
     * @param supplierId The ID of the supplier to be assigned to the order.
     * @return A ResponseEntity containing the updated order.
     */
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

    /**
     * Retrieves a list of top-selling items by frequency.
     *
     * @return A list of maps containing top-selling item information.
     */
    @PreAuthorize("hasAnyRole('Order', 'ADMIN', 'Reporting', 'Inventory', 'EmployeeInfo', 'USER')")
    @GetMapping("/top-selling-items")
    public List<Map<String, Object>> getTopSellingItems() {
        return orderService.getTopSellingItemsByFrequency();
    }
}
