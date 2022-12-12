package Controller;


import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "Servlet", value = "/LAB2",urlPatterns = {"/LAB2"})
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {req.getRequestDispatcher("index.jsp").include(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher requestDispatcherJSP=request.getRequestDispatcher("index.jsp");
        RequestDispatcher requestDispatcherServlet = request.getRequestDispatcher("Model/AreaCheckServlet");
        if (request.getAttribute("x")==null || request.getAttribute("y")==null || request.getAttribute("r")==null){
            requestDispatcherJSP.forward(request,response);
        }
        else {requestDispatcherServlet.forward(request,response);}


    }
}
