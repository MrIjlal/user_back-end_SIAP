module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            namaPemohon: {
                type: String,
                required: true
            },
            namaPenerima: {
                type: String,
            },
            jenisSurat: {
                type: String,
                required: true,
            },
            catatan: {
                type: String,
            },
        },
        {
            timestamps: true,
        }
    )
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Surat = mongoose.model("surat", schema);
    return Surat;

}