package CSIT321.CN03.Service;

import CSIT321.CN03.Model.Enums.Order_Status;
import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Model.Order.Order_Item;
import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Repository.Order.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierService supplierService;

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order createOrder(Order order) {
        // Automatically create Order_Item and add it to the order
        Order_Item orderItem = new Order_Item();
        // Set attributes for orderItem as needed
        order.getOrderItems().add(orderItem);
        return orderRepository.save(order);
    }

    @Transactional
    public Order assignSupplierToOrder(Long orderId, Long supplierId) {
        Order order = getOrderById(orderId);
        Supplier supplier = supplierService.getSupplierById(supplierId);

        order.setSupplier(supplier);

        return orderRepository.save(order);
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
}

