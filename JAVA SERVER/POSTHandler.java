
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class POSTHandler {

    private HttpServletRequest _request;
    private HttpServletResponse _response;

    POSTHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
        _request = request;
        _response = response;
    }

    void doPOST(DBHandler handler) throws IOException, UnsupportedEncodingException {

        if (_request.getParameter("type").equals("login")) {
            performLogin(handler);
        } else if (_request.getParameter("type").equals("register")) {
            performRegister(handler);
        } else if (_request.getParameter("type").equals("add_cart")) {
            performAdd(handler);
        } else if (_request.getParameter("type").equals("remove_cart")) {
            performRemove(handler);
        } else if (_request.getParameter("type").equals("cart")) {
            performCart(handler);
        } else if (_request.getParameter("type").equals("user")) {
            performUser(handler);
        } else if (_request.getParameter("type").equals("mod_user")) {
            performModUser(handler);
        }else if (_request.getParameter("type").equals("order")) {
            performOrder(handler);
        }
    }

    private void performLogin(DBHandler handler) throws UnsupportedEncodingException, IOException {
       
        String username = URLDecoder.decode(_request.getParameter("username"), "UTF-8");
        String password = URLDecoder.decode(_request.getParameter("password"), "UTF-8");

        String query = "select email from users where email=\'" + username + "\' and password=\'" + password + "\'";

        try {
            ResultSet set = handler.executeQuery(query);
            int nrRows = countRows(set);
            if (nrRows != 1) {
                _response.getWriter().print("failed");
            } else {
                _response.addCookie(new Cookie("user", username));
                _response.getWriter().print("succes");
            }
        } catch (SQLException ex) {
            _response.getWriter().print("failed");
        }              
    }

    public int countRows(ResultSet set) throws SQLException {
        int index = 0;
        while (set.next()) {
            index++;
        }
        return index;
    }

    private void performRegister(DBHandler handler) throws UnsupportedEncodingException, IOException {
        
        StringBuilder query = new StringBuilder("insert into users (nume, email, password, prenume, adresa, telefon) values(");
        List<String> values = new ArrayList<String>();

        values.add(URLDecoder.decode(_request.getParameter("nume"), "UTF-8"));
        values.add(URLDecoder.decode(_request.getParameter("email"), "UTF-8"));
        values.add(URLDecoder.decode(_request.getParameter("password"), "UTF-8"));
        values.add(URLDecoder.decode(_request.getParameter("prenume"), "UTF-8"));
        values.add(URLDecoder.decode(_request.getParameter("adresa"), "UTF-8"));
        values.add(URLDecoder.decode(_request.getParameter("telefon"), "UTF-8"));

        for (String string : values) {
            query.append("\'" + string + "\' ,");
        }
        query.delete(query.length() - 1, query.length());
        query.append(")");

        try {
            handler.executeUpdate(query.toString());
            _response.getWriter().print("Ai fost inregistrat cu succes! Acum te poti loga!");
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            _response.getWriter().print("Data introduse sunt invalide!");
        }
    }

    private void performAdd(DBHandler handler) throws UnsupportedEncodingException, IOException {
        

        String username = URLDecoder.decode(_request.getCookies()[0].getValue(), "UTF-8");
        String id = URLDecoder.decode(_request.getParameter("id"), "UTF-8");

        StringBuilder query = new StringBuilder("insert into cart values( \'" + id + "\' ,\'" + username + "\')");
        try {
            handler.executeUpdate(query.toString());
            _response.getWriter().print("Added to cart!");
        } catch (SQLException ex) {
            _response.getWriter().print("Failed to add!");
        }
    }

    private void performRemove(DBHandler handler) throws UnsupportedEncodingException, IOException {
        
        String username = URLDecoder.decode(_request.getCookies()[0].getValue(), "UTF-8");
        String id = URLDecoder.decode(_request.getParameter("id"), "UTF-8");

        StringBuilder query = new StringBuilder("delete from cart where id = \'" + id + "\' and username = \'" + username + "\'");

        try {
            handler.executeUpdate(query.toString());
            _response.getWriter().print("Deleted cart!");
        } catch (SQLException ex) {
            _response.getWriter().print("Failed to delete!");
        }
    }
       private void performOrder(DBHandler handler) throws UnsupportedEncodingException, IOException {
        
        String username = URLDecoder.decode(_request.getCookies()[0].getValue(), "UTF-8");

        StringBuilder query = new StringBuilder("delete from cart where username = \'" + username + "\'");
        try {
            handler.executeUpdate(query.toString());
            _response.getWriter().print("succes");
        } catch (SQLException ex) {
            _response.getWriter().print("Comanda nu a putut fi plasata!");
        }
    }

    private void performCart(DBHandler handler) throws UnsupportedEncodingException, IOException {
        
        String username = URLDecoder.decode(_request.getCookies()[0].getValue(), "UTF-8");
        ResultSet result;
        try {
            result = handler.executeQuery("select * from ( select * from items ii join (select id, count(id) \"nr_bucati\" from cart where username= \'" + username + "\' group by id) itemsfor using(id) join ( select item_id, location from itemtoimage ) imaage on (item_id = ii.id) ) alias group by titlu");

            int rowcount = 0;
            ResultSetMetaData rsmd = result.getMetaData();

            int columnsNumber = rsmd.getColumnCount();
            StringBuilder response = new StringBuilder();

            while (result.next()) {
                response.append("{");
                for (int index = 1; index <= columnsNumber; index++) {
                    response.append("\"" + rsmd.getColumnName(index) + "\" : \"" + result.getString(index) + "\",");
                }
                rowcount++;
                response.delete(response.length() - 1, response.length());
                response.append("},");
            }
            response.delete(response.length() - 1, response.length());

            
                response = new StringBuilder("["+response+"]");
            
            _response.getWriter().print(response.toString());
        } catch (SQLException ex) {
            _response.getWriter().print("failed");
            return;
        }
    
    }

    private void performUser(DBHandler handler) throws UnsupportedEncodingException, IOException {
        
        String username = URLDecoder.decode(_request.getCookies()[0].getValue(), "UTF-8");
        try {
            ResultSet result = handler.executeQuery("select * from users where email = \'" + username + "\'");
            if(result == null){
                _response.getWriter().print("failed");
                return;
            }
            int rowcount = 0;
            ResultSetMetaData rsmd = result.getMetaData();

            int columnsNumber = rsmd.getColumnCount();
            StringBuilder response = new StringBuilder();

//            response.append("[");
            while (result.next()) {
                response.append("{");
                for (int index = 1; index <= columnsNumber; index++) {
                    response.append("\"" + rsmd.getColumnName(index) + "\" : \"" + result.getString(index) + "\",");
                }
                rowcount++;
                response.delete(response.length() - 1, response.length());
                response.append("},");
            }
            response.delete(response.length() - 1, response.length());

            if (rowcount > 1) {
                response = new StringBuilder("[" + response + "]");
            }
            _response.getWriter().print(response.toString());
        } catch (SQLException ex) {
            _response.getWriter().print("failed");
            return;
        }
    }

    private void performModUser(DBHandler handler) throws UnsupportedEncodingException, IOException {
        
        String username = URLDecoder.decode(_request.getCookies()[0].getValue(), "UTF-8");
        String query = computeQueryForModUser(_request, username);

        _response.getWriter().println(query);
        try {
            handler.executeUpdate(query);
            _response.getWriter().print("Modified with succes!");
        } catch (SQLException ex) {
            _response.getWriter().print("Failed to modify!");
        }
    }

    private String computeQueryForModUser(HttpServletRequest _request, String username) throws UnsupportedEncodingException {
        StringBuilder query = new StringBuilder("update users set ");
        Map<String, String> params = new HashMap<String, String>();

        if (!_request.getParameter("nume").equals("")) {
            params.put("nume", URLDecoder.decode(_request.getParameter("nume"), "UTF-8"));
        }
        if (!_request.getParameter("password").equals("")) {
            params.put("password", URLDecoder.decode(_request.getParameter("password"), "UTF-8"));
        }
        if (!_request.getParameter("prenume").equals("")) {
            params.put("prenume", URLDecoder.decode(_request.getParameter("prenume"), "UTF-8"));
        }
        if (!_request.getParameter("adresa").equals("")) {
            params.put("adresa", URLDecoder.decode(_request.getParameter("adresa"), "UTF-8"));
        }
        if (!_request.getParameter("telefon").equals("")) {
            params.put("telefon", URLDecoder.decode(_request.getParameter("telefon"), "UTF-8"));
        }

        if (params.isEmpty()) {
            return "update users set email = \'" + username + "\' where email = \'" + username + "\'";
        }
        for (Entry<String, String> entry : params.entrySet()) {
            query.append(entry.getKey() + " = \'" + entry.getValue() + "\',");
        }
        query.delete(query.length() - 1, query.length());
        query.append(" where email = \'" + username + "\'");
        return query.toString();
    }

}
