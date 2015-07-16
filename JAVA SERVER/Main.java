
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Main extends HttpServlet {

    private DBHandler handler;
    @Override
    public void init() throws ServletException {
        
            super.init();
    
            handler = new DBHandler();
  
    }
    

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        GETHandler getHandler = new GETHandler(request, response);

        getHandler.doGET(handler);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        POSTHandler postHandler = new POSTHandler(request, response);
        postHandler.doPOST(handler);
    }

    @Override
    public void destroy() {
        super.destroy();
        handler.close();
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
