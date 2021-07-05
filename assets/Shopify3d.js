  (function(s3d) {
    if (!s3d) {
      console.warn('"window.Shopify3d" does not exist. Please ensure you\'ve added the <script> to your theme');
      return;
    }
    {% for variant in product.variants %}
      s3d.mapMetafieldAssets('{{ variant.id }}', '{{  variant.metafields.shopify3d['assets'] }}');
    {% endfor %}
  })(window.Shopify3d);