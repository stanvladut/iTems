
import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class DBHandler {

    private Connection link;
    private Statement statement;

    static Map<String, String> quries = new HashMap<String, String>();

    static {
        quries.put("create", "create table contacts ("
                + "    nume varchar(255) unique not null,"
                + "    prenume varchar(255) unique not null,"
                + "    telefon_mobil varchar(10) not null,"
                + "    telefon_fix varchar(10),"
                + "    email varchar(255) unique not null,"
                + "    adresa varchar(255),"
                + "    oras varchar(255),"
                + "    judet varchar(255),"
                + "    cod_postal varchar(255),"
                + "    primary key (nume, prenume)"
                + ");");
    }

    public static void main(String[] args) {

    }

    public DBHandler() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            link = DriverManager.getConnection("jdbc:mysql://localhost:3306/iTems", "root", "");
            statement = (Statement) link.createStatement();
        } catch (ClassNotFoundException cnfe) {
            System.out.println("* Driverul nu a putut fi incarcat! *");
            System.exit(1);
        } catch (SQLException sqlEx) {
            System.out.println("* Conectarea la baza de date a esuat! *");
            sqlEx.printStackTrace(System.out);
            System.exit(1);
        }
    }

    public ResultSet executeQuery(String query) throws SQLException {

        return statement.executeQuery(query);
    }

    public int executeUpdate(String query) throws SQLException {

        return statement.executeUpdate(query);

    }

    public void close() {

        try {
            link.close();
        } catch (SQLException sqlEx) {
            System.out.println("* Nu m-am putut deconecta! *");
        }
    }
}
