<?php

// Setting the data
$data = array(
    1 => array(
        'kode' => '1001',
        'nama_barang' => 'Sabun Lifebuoy',
        'harga' => 1500,
    ),
    2 => array(
        'kode' => '1002',
        'nama_barang' => 'Permen Blaster',
        'harga' => 5600,
    ),
    3 => array(
        'kode' => '1003',
        'nama_barang' => 'Pasta Gigi Pepsodent',
        'harga' => 4560,
    ),
    4 => array(
        'kode' => '1004',
        'nama_barang' => 'Madu Arbain',
        'harga' => 30000,
    ),
    5 => array(
        'kode' => '1005',
        'nama_barang' => 'Kecap ABC',
        'harga' => 7250,
    ),
    6 => array(
        'kode' => '1006',
        'nama_barang' => 'Saus Tomat ABC',
        'harga' => 6700,
    ),
    7 => array(
        'kode' => '1007',
        'nama_barang' => 'Gula Gulaku',
        'harga' => 8900,
    ),
    8 => array(
        'kode' => '1008',
        'nama_barang' => 'Rinso',
        'harga' => 7100,
    ),
    9 => array(
        'kode' => '1009',
        'nama_barang' => 'Super Pel',
        'harga' => 6450,
    ),
    10 => array(
        'kode' => '1010',
        'nama_barang' => 'Permen Tango',
        'harga' => 5600,
    ),
);
echo json_encode($data);

