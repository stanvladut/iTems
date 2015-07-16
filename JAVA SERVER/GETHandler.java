
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GETHandler {

    private final HttpServletRequest _request;
    private final HttpServletResponse _response;
    private final PrintWriter log;

    GETHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
        log = new PrintWriter(new BufferedWriter(new FileWriter("getLogs.out", true)));
        _request = request;
        _response = response;
    }

    void doGET(DBHandler handler) throws IOException {
        String fileName = getFileName();
        if (fileName == null) {
            info("funct doGET", "fileName null for: " + _request.getRequestURL());
            return;
        }
        if (fileName.contains(".json")) {
            returnJSON(fileName, handler);
            return;
        }

        File file = new File(fileName);
        InputStream input = new FileInputStream(file);
        byte[] bytes = new byte[1024 * 8];
        int n = 0;
        while (-1 != (n = input.read(bytes))) {
            _response.getOutputStream().write(bytes, 0, n);
        }
    }

    private void returnJSON(String fileName, DBHandler handler) throws IOException {

        _response.setContentType("application/json");
        fileName = fileName.replace(".json", "");
        try {
            if (fileName.matches("\\d+")) {
                printJSONForQuery1("select * from items where id=" + fileName, handler, fileName);
            } else {
                printJSONForQuery("select i.id,titlu,pret,reducere,descriere,miniDesc from items i join categoriestoitems c on c.item_id = i.id join categories cc on cc.id = c.category_id where lower(cc.name) like \'%" + fileName
                        + "%\'", handler);
            }
        } catch (SQLException ex) {
            
            ex.printStackTrace(System.out);
        }
    }

    private void printJSONForQuery(String query, DBHandler handler) throws SQLException, IOException {
        
        ResultSet result = handler.executeQuery(query);

        int rowcount = 0;
        ResultSetMetaData rsmd = result.getMetaData();

        int columnsNumber = rsmd.getColumnCount();
        StringBuilder response = new StringBuilder();

        while (result.next()) {
            response.append("{");
            String id = result.getString("id");
            for (int index = 1; index <= columnsNumber; index++) {
                response.append("\"" + rsmd.getColumnName(index).toLowerCase() + "\" : \"" + result.getString(index) + "\",");
            }
            rowcount++;
            response.delete(response.length() - 1, response.length());
            
            String resp = getImagesFor(id, 1);

            response.append(resp);

            response.append("},");
            rowcount++;
        }
        response.delete(response.length() - 1, response.length());

        if (rowcount > 1) {
            response = new StringBuilder("[" + response + "]");

        }
        _response.getWriter().print(response.toString());
    }

    private void printJSONForQuery1(String query, DBHandler handler, String id) throws SQLException, IOException {
        
        ResultSet result = handler.executeQuery(query);
        
        int rowcount = 0;
        ResultSetMetaData rsmd = result.getMetaData();

        int columnsNumber = rsmd.getColumnCount();
        StringBuilder response = new StringBuilder();

        while (result.next()) {
            response.append("{");
            for (int index = 1; index <= columnsNumber; index++) {
                response.append("\"" + rsmd.getColumnName(index).toLowerCase() + "\" : \"" + result.getString(index) + "\",");
            }
            
            rowcount++;
            response.delete(response.length() - 1, response.length());
            
            String resp = getImagesFor(id, 4);

            response.append(resp);

            response.append("},");
            if(result.isLast())
                break;
        }
        result.close();
        response.delete(response.length() - 1, response.length());

        if (rowcount > 1) {
            response = new StringBuilder("[" + response + "]");
        }
        _response.getWriter().print(response.toString());
    }

    private String getFileName() {
        String fileName = _request.getRequestURL().toString().split(":8080/")[1];
        //.replace("http://localhost:8080/iTems/", "");        
        fileName = fileName.replace("iTems", "");
        if (fileName.startsWith("/")) {
            fileName = fileName.substring(1);
        }
        if (fileName.equals("")) {
            fileName = "index.html";
        }
        setContentType(fileName, _response);

        try {
            return URLDecoder.decode(fileName, "UTF-8");
        } catch (UnsupportedEncodingException ex) {
            info("funct getFileName" + ex.getMessage());
            return null;
        }
    }

    private void setContentType(String fileName, HttpServletResponse _response) {
        if (fileName.contains(".html")) {
            _response.setContentType("text/html");
        } else if (fileName.contains(".js")) {
            _response.setContentType("text/javascript");
        } else if (fileName.contains(".css")) {
            _response.setContentType("text/css");
        }
    }

    private void info(String... args) {
        log.print("[" + (new Date()) + "]");
        for (String a : args) {
            log.print("[" + a + "]");
        }
    }

    private String getImagesFor(String id, int number) throws SQLException {
        
        DBHandler handler = new DBHandler();
        StringBuilder response = new StringBuilder();
        String query = "select * from itemtoimage where item_id = " + id;
        
        ResultSet result = handler.executeQuery(query);
        int rowcount = 0;
        while (result.next() && rowcount < number) {
            
            rowcount++;
            response.append(",\"img" + (number != 1? rowcount : "" )+ "\" : \"" + result.getString(2) + "\"");
        }
        result.close();
        handler.close();
        return response.toString();
    }


}
