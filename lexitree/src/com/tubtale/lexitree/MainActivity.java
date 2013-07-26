package com.tubtale.lexitree;
import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

import com.google.ads.*;
import com.google.ads.AdView;
import android.widget.LinearLayout;

public class MainActivity extends DroidGap {

	private static final String AdMob_Ad_Unit = "a151f260941ee13";
	private AdView adView;
	
	public void onCreate(Bundle savedInstanceState) {
		
		
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
		
		
		
		adView = new AdView(this, AdSize.BANNER, AdMob_Ad_Unit); 
		LinearLayout layout = super.root;
		layout.addView(adView); 
		AdRequest request = new AdRequest();
		request.setTesting(true);
		adView.loadAd(request);
		
		
		
		setContentView(R.layout.activity_main);
	}

	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
