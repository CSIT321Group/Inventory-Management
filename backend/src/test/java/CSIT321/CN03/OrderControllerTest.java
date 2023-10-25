package CSIT321.CN03;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import CSIT321.CN03.API.OrderController;
import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

class OrderControllerTest {

    @InjectMocks
    private OrderController orderController;

    @Mock
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetOrderById() {
        Order order = new Order();
        order.setId(1L);
        when(orderService.getOrderById(1L)).thenReturn(order);

        Order result = orderController.getOrderById(1L);
        assertEquals(order, result);
    }

    @Test
    void testGetAllOrders() {
        Order order = new Order();
        List<Order> orders = Collections.singletonList(order);
        when(orderService.getAllOrders()).thenReturn(orders);

        List<Order> result = orderController.getAllOrders();
        assertEquals(orders, result);
    }

    @Test
    void testCreateOrder() {
        Order order = new Order();
        when(orderService.createOrder(order)).thenReturn(order);

        ResponseEntity<Order> result = orderController.createOrder(order);
        assertEquals(order, result.getBody());
    }

}
