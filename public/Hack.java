import java.util.HashMap;

public class Hack {
    public static void main(String[] args) {
        int max = 1500;
        int min = 100;

        System.out.println(fun(max, min));
    }


    static HashMap<Integer, Integer> fun(int max, int min){
        int samm = ((max-min)/13);

        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < 14; i++) {
            map.put(i, min+(samm*i));
        }

        map.put(14, max);

        return map;
    }
/*
    static void funik(double tulemus) {
        HashMap
    }
*/
}
