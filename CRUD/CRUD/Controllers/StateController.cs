using CRUD.Data;
using CRUD.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    public class StateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Service _service;
        public StateController(IConfiguration configuration, Service service)
        {
            _configuration = configuration;
            _service = service;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] Login model)
        {
            var authenticatedUser = _service.authenticate(model.username, model.password);

            // Check if authentication was successful
            if (authenticatedUser == null)
            {
                return Unauthorized();
            }

            // Generate token only if authentication was successful
            var token = _service.generateToken(model.username);
            return Ok(new { token });

        }


        [Route("register")]
        [HttpPost]

        public IActionResult Post([FromBody] Register obj)
        {
            if (_service.checkUser(obj.username))
            {
                if (_service.register(obj))
                {
                    return Ok(new { obj });
                }
                else
                {
                    return BadRequest("Error occured while registering");
                }
            }
            return BadRequest("Enter a unique username");

        }


        //[Route("GetAllStates")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllStates()
        {
            //DataTable dt = new DataTable();
            //NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //string query = "select * from \"tblStateMaster\";";
            //NpgsqlCommand cmd = new NpgsqlCommand(query,con);
            //NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            //da.Fill(dt);

            NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            string query = "select * from \"tblStateMaster\";";
            con.Open();
            NpgsqlCommand cmd = new NpgsqlCommand(query, con);
            NpgsqlDataReader dr = cmd.ExecuteReader();

            List<State> listStates = new List<State>();

            //foreach (DataRow dr in dt.Rows)
            while (dr.Read())
            {
                listStates.Add(new State
                {
                    intStateID = Convert.ToInt32(dr["intStateID"]),
                    StrStateName = dr["StrStateName"].ToString(),
                    intCountryID = Convert.ToInt32(dr["intCountryID"])

                });
            }
            con.Close();
            return Ok(listStates
                //new Response
                //{
                //    Success = true,
                //    Data = listStates,
                //    Status = 200
                //}
                );
        }


        //[Route("GetOneState")]
        [Authorize]
        [HttpGet("{id}")]

        public async Task<IActionResult> GetOneState(int id)
        {
            bool check = id.check();
            if (check)
            {
                NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                NpgsqlCommand cmd = new NpgsqlCommand("select * from \"tblStateMaster\" where \"intStateID\"= @id ", con);

                cmd.Parameters.AddWithValue("@id", id);
                NpgsqlDataReader dr = cmd.ExecuteReader();

                List<State> listStates = new List<State>();

                //foreach (DataRow dr in dt.Rows)
                if (dr.Read())
                {
                    listStates.Add(new State
                    {
                        intStateID = Convert.ToInt32(dr["intStateID"]),
                        StrStateName = dr["StrStateName"].ToString(),
                        intCountryID = Convert.ToInt32(dr["intCountryID"]),

                    });
                }
                con.Close();
                return Ok(
                //    new Response
                //{
                //    Success = true,
                //    Data = listStates,
                //    Status = 200
                //}
                listStates
                );
            }
            else
            {
                return BadRequest(new Response
                {
                    Success = false,
                    Status = 400

                });

            }
        }


        // Getting Data using object passing.

        //[Route("GetState")]

        //[HttpGet]
        //public async Task<IActionResult> GetState(State obj)
        //{
        //    NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        //    string query = "select * from \"tblStateMaster\" where \"intStateID\"=" + obj.intStateID + ";";
        //    con.Open();
        //    NpgsqlCommand cmd = new NpgsqlCommand(query, con);
        //    NpgsqlDataReader dr = cmd.ExecuteReader();

        //    List<State> listStates = new List<State>();

        //    //foreach (DataRow dr in dt.Rows)
        //    while (dr.Read())
        //    {
        //        listStates.Add(new State
        //        {
        //            intStateID = Convert.ToInt32(dr["intStateID"]),
        //            StrStateName = dr["StrStateName"].ToString(),
        //            intCountryID = Convert.ToInt32(dr["intCountryID"])

        //        });
        //    }
        //    con.Close();
        //    return Ok(listStates);
        //}

        [Route("InsertState")]
        [Authorize]
        [HttpPost]

        public async Task<IActionResult> InsertState([FromBody] State obj)
        {
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                string query = "insert into  \"tblStateMaster\"(\"StrStateName\",\"intCountryID\") Values ('" + obj.StrStateName + "'," + obj.intCountryID + ");";
                con.Open();
                NpgsqlCommand cmd = new NpgsqlCommand(query, con);
                cmd.ExecuteNonQuery();
                con.Close();
                return Ok(obj);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




        //[HttpPost]
        //[Route("CountryID")]


        //public async Task<IActionResult> InsertState(string StateName, int CountryID)
        //{
        //    try
        //    {
        //        NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        //        string query = "insert into  \"tblStateMaster\"(\"StrStateName\",\"intCountryID\") Values (@stateName,@id);";
        //        con.Open();
        //        NpgsqlCommand cmd = new NpgsqlCommand(query, con);
        //        cmd.Parameters.AddWithValue("@stateName", StateName);
        //        cmd.Parameters.AddWithValue("@id", CountryID);
        //        cmd.ExecuteNonQuery();
        //        con.Close();
        //        return Ok(new Response
        //        {
        //            Success = true,
        //            Status = 200
        //        });

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        [Route("UpdateState")]
        [Authorize]
        [HttpPut]

        public async Task<IActionResult> UpdateState([FromBody] State obj)
        {
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                string query = "update \"tblStateMaster\" set \"StrStateName\"='" + obj.StrStateName + "',\"intCountryID\"=" + obj.intCountryID + " where \"intStateID\"=" + obj.intStateID + ";";
                con.Open();
                NpgsqlCommand cmd = new NpgsqlCommand(query, con);
                cmd.ExecuteNonQuery();
                con.Close();
                return Ok(obj);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //[Route("{StateID}")]
        //[HttpPut]

        //public async Task<IActionResult> UpdateState(int StateID, string State_Name,int CountryID)
        //{
        //    try
        //    {
        //        NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        //        string query = "update \"tblStateMaster\" set \"StrStateName\"=@state,\"intCountryID\"=@cid where \"intStateID\"=@id;";
        //        con.Open();
        //        NpgsqlCommand cmd = new NpgsqlCommand(query, con);
        //        cmd.Parameters.AddWithValue("@id", StateID);
        //        cmd.Parameters.AddWithValue("@state", State_Name);
        //        cmd.Parameters.AddWithValue("@cid", CountryID);
        //        cmd.ExecuteNonQuery();
        //        con.Close();
        //        return Ok(new Response
        //        {
        //            Success = true,
        //            Status = 200
        //        });

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        // Passing Attribute in route
        //[Route("DeleteState")] 
        //[HttpDelete]

        //public async Task<IActionResult> DeleteState(State obj)
        //{
        //    try
        //    {
        //        NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        //        string query = "delete from \"tblStateMaster\" where \"intStateID\"="+obj.intStateID+";";
        //        con.Open();
        //        NpgsqlCommand cmd = new NpgsqlCommand(query, con);
        //        cmd.ExecuteNonQuery();
        //        con.Close();
        //        return Ok(obj);

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}


        [Route("{StateID}")]
        [Authorize]
        [HttpDelete]

        public async Task<IActionResult> DeleteState(int StateID)
        {
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                string query = "delete from \"tblStateMaster\" where \"intStateID\"=@id;";
                con.Open();
                NpgsqlCommand cmd = new NpgsqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", StateID);
                cmd.ExecuteNonQuery();
                con.Close();
                return Ok(new Response
                {
                    Success = true,
                    Status = 200
                });

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [Route("StateByCountry")]
        [Authorize]
        [HttpGet]

        public IActionResult getStateByCountry(string countryName)
        {
            var states = new List<State>();
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open(); 
                NpgsqlCommand command = new NpgsqlCommand("select s.\"intCountryID\", s.\"intStateID\", s.\"StrStateName\" from \"tblCountryMaster\" c join \"tblStateMaster\" s on c.\"intCountryID\"=s.\"intCountryID\"\r\nwhere c.\"StrCountryName\"=@countryName;", con);
                command.Parameters.AddWithValue("@countryName", countryName);
                NpgsqlDataReader dr =  command.ExecuteReader();

                while(dr.Read())
                {
                    var state = new State
                    {
                        intCountryID = Convert.ToInt32( dr["intCountryID"]),
                        intStateID = Convert.ToInt32(dr["intStateID"]),
                        StrStateName = Convert.ToString(dr["StrStateName"])
                    };
                    states.Add(state);
                }
                con.Close();
                return Ok(states);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("GetCountries")]
        [Authorize]
        [HttpGet]
        public IActionResult getCountries()
        {
            try
            {
                var countries = new List<Country>();
                NpgsqlConnection connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                connection.Open();
                NpgsqlCommand command = new NpgsqlCommand("select * from \"tblCountryMaster\" ", connection);
                NpgsqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {

                    var country = new Country
                    {
                        intCountryID = Convert.ToInt32(reader[0]),
                        StrCountryName = reader[1].ToString()
                    };
                    countries.Add(country);
                }
                connection.Close();
                return Ok(countries);
            }

            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
