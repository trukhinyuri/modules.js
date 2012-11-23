package com.trukhin.hardinv;


import org.apache.commons.cli.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * (C) trukhinyuri
 * Date: 11/18/12
 * Time: 11:17 PM
 * yuri@trukhin.com
 */
public class Main {
    public static void main(String args[]) throws IOException, ParseException {
        Options options = new Options();
        options.addOption("ip", false, "ip");
        options.addOption("p", false, "port");
        options.addOption("h", false, "hostname");
        CommandLineParser parser = new GnuParser();
        CommandLine cmd = parser.parse(options, args);
        System.out.println("ipaddr=" + cmd.getOptionValue("ip") +"; p=" + cmd.getOptionValue("p") + ";");

//        Socket echoSocket = null;
//        PrintWriter out = null;
//        BufferedReader in = null;
//
//        try {
//            echoSocket = new Socket("taranis", 7);
//            out = new PrintWriter(echoSocket.getOutputStream(), true);
//            in = new BufferedReader(new InputStreamReader(
//                    echoSocket.getInputStream()));
//        } catch (UnknownHostException e) {
//            System.err.println("Don't know about host: taranis.");
//            System.exit(1);
//        } catch (IOException e) {
//            System.err.println("Couldn't get I/O for "
//                    + "the connection to: taranis.");
//            System.exit(1);
//        }
//
//        BufferedReader stdIn = new BufferedReader(
//                new InputStreamReader(System.in));
//        String userInput;
//
//        while ((userInput = stdIn.readLine()) != null) {
//            out.println(userInput);
//            System.out.println("echo: " + in.readLine());
//        }
//
//        out.close();
//        in.close();
//        stdIn.close();
//        echoSocket.close();
    }
}
