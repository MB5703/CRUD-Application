using CRUD.Models;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CRUD.Data
{
    public class Service
    {
        private readonly string _connection;
        private readonly IConfiguration _configuration;

        public Service(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = _configuration.GetConnectionString("DefaultConnection");
        }

        public Login authenticate(string name, string password)
        {

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("select name,password from login where name =@name and password = @password", connection))
                {
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@password", password);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Login
                            {
                                username = reader.GetString(0),
                                password = reader.GetString(1)
                            };

                        }
                        return null;
                    }
                }
            }
        }

        public List<Login> allUsers()
        {
            var users = new List<Login>();
            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                using (var command = new NpgsqlCommand("select * from login;", connection))
                {
                    using (var reader = command.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            var user = new Login
                            {
                                id = reader.GetInt32(0),
                                username = reader.GetString(1),
                                password = reader.GetString(2)
                            };

                            users.Add(user);
                        }
                        return users;
                    }
                }
            }
        }

        public bool checkUser(string username)
        {
            using (var con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                con.Open();
                using (var command = new NpgsqlCommand("select count(*) from login where name = @name", con))
                {
                    command.Parameters.AddWithValue("@name", username);
                    Int64 a = (Int64)command.ExecuteScalar();
                    Console.WriteLine(a);
                    if (a == 0)
                    {
                        return true;
                    }
                    return false;
                }
            }
        }


        public bool register(Register obj)
        {

            using (var con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                con.Open();
                using (var command = new NpgsqlCommand("insert into register (name,username,password,email) values (@name,@username,@password,@email); insert into login (name,password) values (@username,@password)", con))
                {
                    command.Parameters.AddWithValue("@name", obj.name);
                    command.Parameters.AddWithValue("@username", obj.username);
                    command.Parameters.AddWithValue("@password", obj.password);
                    command.Parameters.AddWithValue("@email", obj.email);


                    int a = command.ExecuteNonQuery();
                    if (a == 0)
                    {
                        return false;
                    }
                    return true;

                }
            }

        }

        public string generateToken(string name)
        {
            var key = Encoding.ASCII.GetBytes("MySecretKeyis1234567890andMalay05072003");
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim (ClaimTypes.Name,name)
                }),

                Expires = DateTime.UtcNow.AddHours(1),
                Audience = "https://localhost:44389/",
                Issuer = "https://localhost:44389/",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
