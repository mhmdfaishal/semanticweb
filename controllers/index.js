const SparqlClient = require('sparql-http-client');
const endpointUrl = 'http://localhost:3030/projectsemweb/sparql';
const client = new SparqlClient({endpointUrl});

// const { join, dirname } = require('path');

// const fromFile = require('rdf-utils-fs/fromFile')
// const turtle = join(dirname(module.filename), '../models/friends.ttl')
// const getTurtleFile = fromFile(turtle);
// const namespace = require('@rdfjs/namespace')

// const ns = {
//     schema: namespace('http://schema.org/'),
//     rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
//     xml: namespace('http://www.w3.org/XML/1998/namespace'),
//     rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#'),  
//     friend: namespace('hhttp://www.semanticweb.org/mhmdf/ontologies/2022/4/friendsinfo#'),
//     self: namespace('http://www.semanticweb.org/mhmdf/ontologies/2022/4/self#')
// }


module.exports = {
    index: async function (req,res,next){
        var query = `
            PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
    
            SELECT *
            WHERE {
                ?x mahasiswa:nama ?nama .
                ?x mahasiswa:npm ?npm .
                ?x mahasiswa:judul ?judul .
                ?x mahasiswa:perusahaan ?perusahaan .
                ?x mahasiswa:tahun_masuk ?tahun_masuk .
                ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                ?x mahasiswa:tahun_lulus ?tahun_lulus .
                ?x mahasiswa:tempat_lahir ?tempat_lahir .
            }
        `;
        const query_angkatan = `
            PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
    
            SELECT (SAMPLE(?angkatan) AS ?tahun_masuk) (COUNT(?angkatan) as ?total)
            WHERE {
            ?x mahasiswa:tahun_masuk ?angkatan .
            } GROUP BY ?angkatan
        `;
        const query_lulus = `
            PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
    
            SELECT (SAMPLE(?lulus) AS ?tahun_lulus) (COUNT(?lulus) as ?total)
            WHERE {
            ?x mahasiswa:tahun_lulus ?lulus .
            } GROUP BY ?lulus
        `;
        const query_perusahaan = `
            PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
    
            SELECT (SAMPLE(?company) AS ?perusahaan) (COUNT(?company) as ?total)
            WHERE {
            ?x mahasiswa:perusahaan ?company .
            } GROUP BY ?company
        `;
        if(req.query.search){
            if(req.query.masuk){
                query = `
                PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
        
                SELECT *
                WHERE {
                    {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER regex(?nama, "${req.query.search}", "i")
                        FILTER (?tahun_masuk = "${req.query.masuk}")
                    }UNION{
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?npm = "${req.query.search}")
                        FILTER (?tahun_masuk = "${req.query.masuk}")
                    }
                }
            `;
            }else if(req.query.lulus){
                query = `
                PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
        
                SELECT *
                WHERE {
                    {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER regex(?nama, "${req.query.search}", "i")
                        FILTER (?tahun_lulus = "${req.query.lulus}")
                    }UNION{
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?npm = "${req.query.search}")
                        FILTER (?tahun_lulus = "${req.query.lulus}")
                    }
                }
            `;
            }else if(req.query.perusahan){
                query = `
                PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
        
                SELECT *
                WHERE {
                    {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER regex(?nama, "${req.query.search}", "i")
                        FILTER (?perusahaan = "${req.query.perusahaan}")
                    }UNION{
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?npm = "${req.query.search}")
                        FILTER (?perusahaan = "${req.query.perusahaan}")
                    }
                }
            `;
            }
            else{
                query = `
                PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
        
                SELECT *
                WHERE {
                    {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER regex(?nama, "${req.query.search}", "i")
                    }UNION{
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?npm = "${req.query.search}")
                    }
                    
                }
            `;
            }
        }else if(req.query.masuk && (!req.query.search || req.query.search === null)){
            if(req.query.lulus){
                if(req.query.perusahaan){
                    query = `
                        PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                        PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                        BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
                
                        SELECT *
                        WHERE {
                            ?x mahasiswa:nama ?nama .
                            ?x mahasiswa:npm ?npm .
                            ?x mahasiswa:judul ?judul .
                            ?x mahasiswa:perusahaan ?perusahaan .
                            ?x mahasiswa:tahun_masuk ?tahun_masuk .
                            ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                            ?x mahasiswa:tahun_lulus ?tahun_lulus .
                            ?x mahasiswa:tempat_lahir ?tempat_lahir .
                            FILTER (?tahun_masuk = "${req.query.masuk}")
                            FILTER (?tahun_lulus = "${req.query.lulus}")
                            FILTER (?perusahaan = "${req.query.perusahaan}")
                        }
                    `;
                }else{
                    query = `
                        PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                        PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                        BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
                
                        SELECT *
                        WHERE {
                            ?x mahasiswa:nama ?nama .
                            ?x mahasiswa:npm ?npm .
                            ?x mahasiswa:judul ?judul .
                            ?x mahasiswa:perusahaan ?perusahaan .
                            ?x mahasiswa:tahun_masuk ?tahun_masuk .
                            ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                            ?x mahasiswa:tahun_lulus ?tahun_lulus .
                            ?x mahasiswa:tempat_lahir ?tempat_lahir .
                            FILTER (?tahun_masuk = "${req.query.masuk}")
                            FILTER (?tahun_lulus = "${req.query.lulus}")
                        }
                    `;
                }
            }else if(req.query.perusahaan){
                query = `
                    PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
            
                    SELECT *
                    WHERE {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?tahun_masuk = "${req.query.masuk}")
                        FILTER (?perusahaan = "${req.query.perusahaan}")
                    }
                `;
            }
            else{
                query = `
                    PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
            
                    SELECT *
                    WHERE {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?tahun_masuk = "${req.query.masuk}")
                    }
                `;
            }
        }else if(req.query.lulus && ((!req.query.masuk || req.query.masuk === null) && (!req.query.search || req.query.search===null))){
            if(req.query.perusahaan){
                query = `
                    PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
            
                    SELECT *
                    WHERE {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?tahun_lulus = "${req.query.lulus}")
                        FILTER (?perusahaan = "${req.query.perusahaan}")
                    }
                `;
            }else{
                query = `
                    PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
            
                    SELECT *
                    WHERE {
                        ?x mahasiswa:nama ?nama .
                        ?x mahasiswa:npm ?npm .
                        ?x mahasiswa:judul ?judul .
                        ?x mahasiswa:perusahaan ?perusahaan .
                        ?x mahasiswa:tahun_masuk ?tahun_masuk .
                        ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                        ?x mahasiswa:tahun_lulus ?tahun_lulus .
                        ?x mahasiswa:tempat_lahir ?tempat_lahir .
                        FILTER (?tahun_lulus = "${req.query.lulus}")
                    }
                `;
            }
        }else if(req.query.perusahaan && ((!req.query.lulus || req.query.lulus===null) && (!req.query.masuk || req.query.masuk===null) && !req.query.search || req.query.search===null)){
            query = `
                PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
        
                SELECT *
                WHERE {
                    ?x mahasiswa:nama ?nama .
                    ?x mahasiswa:npm ?npm .
                    ?x mahasiswa:judul ?judul .
                    ?x mahasiswa:perusahaan ?perusahaan .
                    ?x mahasiswa:tahun_masuk ?tahun_masuk .
                    ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
                    ?x mahasiswa:tahun_lulus ?tahun_lulus .
                    ?x mahasiswa:tempat_lahir ?tempat_lahir .
                    FILTER (?perusahaan = "${req.query.perusahaan}")
                }
            `;
        }
        
        const stream = await client.query.select(query)
        const stream_angkatan = await client.query.select(query_angkatan)
        const stream_lulus = await client.query.select(query_lulus)
        const stream_perusahaan = await client.query.select(query_perusahaan)
        var data = []
        var angkatan = []
        var lulus = []
        var perusahaan = []
        stream_perusahaan.on('data', row => {
            perusahaan.push({
                perusahaan: row.perusahaan.value,
                jumlah: row.total.value,
            })
        }).on('end', () => {
            stream_lulus.on('data', row => {
                lulus.push({
                    tahun_lulus: row.tahun_lulus.value,
                    jumlah: row.total.value,
                })
            }).on('end', () => {
                lulus.sort((a, b) => (a.tahun_lulus > b.tahun_lulus) ? 1 : -1)
                stream_angkatan.on('data', row => {
                    angkatan.push({
                        tahun_masuk: row.tahun_masuk.value,
                        jumlah: row.total.value,
                    })
                }).on('end', () => {
                    angkatan.sort((a, b) => (a.tahun_masuk > b.tahun_masuk) ? 1 : -1)
                    stream.on('data', row => {
                        data.push({
                            nama: row.nama.value,
                            npm: row.npm.value,
                            judul: row.judul.value,
                            perusahaan: row.perusahaan.value,
                            tahun_masuk: row.tahun_masuk.value,
                            tahun_bekerja: row.tahun_bekerja.value,
                            tahun_lulus: row.tahun_lulus.value,
                            tempat_lahir: row.tempat_lahir.value
                        })
                    }).on('end', () => {
                        data.sort((a, b) => (a.npm > b.npm) ? 1 : -1)
                        const pageCount = Math.ceil(data.length / 8);
                        let page = parseInt(req.query.page);
                        if (!page) { page = 1;}
                        if (page > pageCount) {
                          page = pageCount
                        }
                        res.render('index',{
                          page: page,
                          pageCount: pageCount,
                          title : 'Semantic Web',
                          data: data.slice(page * 8 - 8, page * 8),
                          angkatan,
                          lulus,
                          perusahaan,
                          query: req.query
                        });
                    })
                })
            })

        })
        
      },

      getProfile : async (req, res) => {
        const query = `
            PREFIX mahasiswa: <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            BASE <http://www.semanticweb.org/mhmdf/ontologies/2022/4/mahasiswa>
    
            SELECT ?nama ?npm ?judul ?perusahaan ?tahun_masuk ?tahun_bekerja ?tahun_lulus ?tempat_lahir
            WHERE {
            ?x mahasiswa:nama ?nama .
            ?x mahasiswa:npm ?npm .
            ?x mahasiswa:judul ?judul .
            ?x mahasiswa:perusahaan ?perusahaan .
            ?x mahasiswa:tahun_masuk ?tahun_masuk .
            ?x mahasiswa:tahun_bekerja ?tahun_bekerja .
            ?x mahasiswa:tahun_lulus ?tahun_lulus .
            ?x mahasiswa:tempat_lahir ?tempat_lahir .
            FILTER (?npm = '${req.params.npm}')
            }
        `;
        const stream = await client.query.select(query)
        var data = []
        stream.on('data', row => {
            data.push({
                nama: row.nama.value,
                npm: row.npm.value,
                judul: row.judul.value,
                perusahaan: row.perusahaan.value,
                tahun_masuk: row.tahun_masuk.value,
                tahun_bekerja: row.tahun_bekerja.value,
                tahun_lulus: row.tahun_lulus.value,
                tempat_lahir: row.tempat_lahir.value
            })
        }).on('end', () => {
            res.send({ data:data,message: "Data found!" });
        })
      }
}