package com.tubtale.lexitree;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

import com.google.ads.*;

import android.widget.LinearLayout;

public class MainActivity extends DroidGap {

	private static final String AdMob_Ad_Unit = "a151f260941ee13";
	private AdView adView;
	
	public void onCreate(Bundle savedInstanceState) {
		
		
		
		/*  try
		     {
		         String pName = this.getClass().getPackage().getName();
		         this.copy("new_lexitree.db","/data/data/"+pName+"/app_database/");
		 }
		     catch (IOException e)
		 {
		  e.printStackTrace();
		 }*/


		 
		
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
		
		
		
		adView = new AdView(this, AdSize.BANNER, AdMob_Ad_Unit); 
		LinearLayout layout = super.root;
		layout.addView(adView); 
		AdRequest request = new AdRequest();
		request.setTesting(true);
		adView.loadAd(request);
		
		
		
		//setContentView(R.layout.activity_main);
	}


	void copy(String file, String folder) throws IOException 
	{
		
		File CheckDirectory;
		CheckDirectory = new File(folder);
		if (!CheckDirectory.exists())
		{ 
			CheckDirectory.mkdir();
		}
		
		File fileexists;
		fileexists = new File(folder+file);
		if (!fileexists.exists())
		{ 
			return;
		}
		
		
		
		 InputStream in = getApplicationContext().getAssets().open(file);
		 OutputStream out = new FileOutputStream(folder+file);
		
		 // Transfer bytes from in to out
		 byte[] buf = new byte[1024];
		 int len; while ((len = in.read(buf)) > 0) out.write(buf, 0, len);
		 in.close(); out.close();
	 
	}
	
	

	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
