const validate = (schema) => (req, res, next) =>{
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });

  if (error) return next(error);
  req.validated = value;
  next();
};

export default validate;

// Fungsi validate di atas adalah middleware yang digunakan untuk memvalidasi data dengan Joi.
// Ia menerima sebuah schema, lalu mengembalikan middleware (req, res, next) yang menjalankan validasi terhadap req.body.
// Jika validasi gagal, next(error) dipanggil sehingga error diteruskan ke error-handling middleware. Jika lolos, nilai hasil validasi (yang sudah bersih) disimpan di req.validated untuk dipakai di controller.