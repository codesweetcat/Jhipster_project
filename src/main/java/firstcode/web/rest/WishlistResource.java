package firstcode.web.rest;

import com.codahale.metrics.annotation.Timed;
import firstcode.domain.Wishlist;

import firstcode.repository.WishlistRepository;
import firstcode.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Wishlist.
 */
@RestController
@RequestMapping("/api")
public class WishlistResource {

    private final Logger log = LoggerFactory.getLogger(WishlistResource.class);

    @Inject
    private WishlistRepository wishlistRepository;

    /**
     * POST  /wishlists : Create a new wishlist.
     *
     * @param wishlist the wishlist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wishlist, or with status 400 (Bad Request) if the wishlist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/wishlists",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Wishlist> createWishlist(@RequestBody Wishlist wishlist) throws URISyntaxException {
        log.debug("REST request to save Wishlist : {}", wishlist);
        if (wishlist.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("wishlist", "idexists", "A new wishlist cannot already have an ID")).body(null);
        }
        Wishlist result = wishlistRepository.save(wishlist);
        return ResponseEntity.created(new URI("/api/wishlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("wishlist", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wishlists : Updates an existing wishlist.
     *
     * @param wishlist the wishlist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wishlist,
     * or with status 400 (Bad Request) if the wishlist is not valid,
     * or with status 500 (Internal Server Error) if the wishlist couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/wishlists",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Wishlist> updateWishlist(@RequestBody Wishlist wishlist) throws URISyntaxException {
        log.debug("REST request to update Wishlist : {}", wishlist);
        if (wishlist.getId() == null) {
            return createWishlist(wishlist);
        }
        Wishlist result = wishlistRepository.save(wishlist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("wishlist", wishlist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wishlists : get all the wishlists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wishlists in body
     */
    @RequestMapping(value = "/wishlists",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Wishlist> getAllWishlists() {
        log.debug("REST request to get all Wishlists");
        List<Wishlist> wishlists = wishlistRepository.findByUserIsCurrentUser();
        return wishlists;
    }

    /**
     * GET  /wishlists/:id : get the "id" wishlist.
     *
     * @param id the id of the wishlist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wishlist, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/wishlists/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Wishlist> getWishlist(@PathVariable Long id) {
        log.debug("REST request to get Wishlist : {}", id);
        Wishlist wishlist = wishlistRepository.findOne(id);
        return Optional.ofNullable(wishlist)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /wishlists/:id : delete the "id" wishlist.
     *
     * @param id the id of the wishlist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/wishlists/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        log.debug("REST request to delete Wishlist : {}", id);
        wishlistRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("wishlist", id.toString())).build();
    }

}
